import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { PatientCaseService } from '../../../../../services/patient-case/patient-case.service';
import JSZip from 'jszip';
import {firstValueFrom} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientCaseModel} from '../../../../../model/PatientCaseModel';
import {EventService} from '../../../../../services/event/event.service';
import {FileCard} from '../../../../../common/file-card/file-card';

export interface CaseFile {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: WritableSignal<number>;
}

enum FileErrorMessage {
  EXT = 'File type is not supported. Only ZIP and DICOM files are allowed.',
  REQUIRED = 'Please add some files.',
}

@Component({
  selector: 'app-create-patient-case',
  imports: [FormsModule, ReactiveFormsModule, FileCard],
  templateUrl: './create-patient-case.html',
  styleUrl: './create-patient-case.scss',
  standalone: true
})
export class CreatePatientCase {
  private patientCaseService = inject(PatientCaseService);
  private router = inject(Router);
  private submitted = false;
  caseFiles = signal<CaseFile[]>([]);
  showFileError = signal<boolean>(false);
  patientCaseForm: FormGroup;
  private eventService = inject(EventService);
  public fileErrorMessage: string = "";

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.patientCaseForm = new FormGroup({
      patientId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
    });
  }

  async onFilesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const allowedExtensions = ['zip', 'dcm'];

    const newCaseFiles: CaseFile[] = [];
    const invalidFiles: string[] = [];

    for (const file of Array.from(input.files)) {

      const extension = file.name
        .split('.')
        .pop()
        ?.toLowerCase();

      // 1. ext validation.
      if (!extension || !allowedExtensions.includes(extension)) {
        invalidFiles.push(file.name);
        break;
      }

      // 2. zip validation
      if (extension === 'zip') {
        const isValidZip = await this.checkZipFile(file);
        if (!isValidZip) {
          invalidFiles.push(`${file.name} (invalid ZIP)`);
          break;
        }
      }

      newCaseFiles.push({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        size: file.size,
        progress: signal(0)
      });
    }

    if (invalidFiles.length > 0) {
      this.showFileError.set(true);
      this.fileErrorMessage = `Unsupported or invalid files: ${invalidFiles.join(', ')}`;
      setTimeout(() => {
        this.showFileError.set(false);
      }, 3000)
      return;
    }

    this.caseFiles.update(list => [...list, ...newCaseFiles]);

    input.value = '';
  }

  private async checkZipFile(file: File): Promise<boolean> {
    try {
      const zip = await JSZip.loadAsync(file);

      const entries = Object.values(zip.files)
        .filter(entry => !entry.dir)
        .filter(entry => !entry.name.startsWith('__MACOSX/'));

      // ZIP must contain at least one file
      if (entries.length === 0) {
        return false;
      }

      // Check every file inside the ZIP
      for (const entry of entries) {
        const extension = entry.name
          .split('.')
          .pop()
          ?.toLowerCase();
        if (extension !== 'dcm') {
          return false;
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  removeFile(id: string): void {
    this.caseFiles.update(list => list.filter(f => f.id !== id));
  }

  public getSubmittedStatus(): boolean {
    return this.submitted;
  }

  async onSubmit(): Promise<void> {
    let showErrors = false;
    if (this.patientCaseForm.invalid) {
      this.patientCaseForm.markAllAsTouched();
      showErrors = true;
    }
    if (this.caseFiles().length < 1) {
      showErrors = true;
      this.fileErrorMessage = FileErrorMessage.REQUIRED;
      this.showFileError.set(true);
    }
    if (showErrors || this.submitted) return;

    this.submitted = true;
    const patientCaseModel: PatientCaseModel = new PatientCaseModel();
    patientCaseModel.patientId = this.patientCaseForm.get('patientId')?.value;
    patientCaseModel.name = this.patientCaseForm.get('name')?.value;

    const caseId = await firstValueFrom(this.patientCaseService.createPatientCase(patientCaseModel));
    for (const caseFile of this.caseFiles()) {
      await this.patientCaseService.uploadFileInChunks(caseFile.file, caseId, caseFile.progress);
    }
    this.eventService.emitNotification({ message: 'Patient case uploaded successfully.' });
    this.router.navigate(['/hospital-admin/cases']);
  }
}
