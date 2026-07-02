import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { PatientCaseService } from '../../../services/patient-case/patient-case.service';
import { DecimalPipe } from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PatientCaseModel} from '../../../model/PatientCaseModel';

interface CaseFile {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: WritableSignal<number>;
}

@Component({
  selector: 'app-create-patient-case',
  imports: [DecimalPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './create-patient-case.html',
  styleUrl: './create-patient-case.scss',
  standalone: true
})
export class CreatePatientCase implements OnInit {
  private patientCaseService = inject(PatientCaseService);
  private submitted = false;
  caseFiles = signal<CaseFile[]>([]);
  showFileError = signal<boolean>(false);
  patientCaseForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.patientCaseForm = new FormGroup({
      patientId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
    });
  }

  ngOnInit() {
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const newCaseFiles: CaseFile[] = Array.from(input.files).map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      progress: signal(0)
    }));

    this.caseFiles.update(list => [...list, ...newCaseFiles]);
    input.value = '';
  }

  removeFile(id: string): void {
    this.caseFiles.update(list => list.filter(f => f.id !== id));
  }

  async onSubmit(): Promise<void> {
    let showErrors = false;
    if (this.patientCaseForm.invalid) {
      this.patientCaseForm.markAllAsTouched();
      showErrors = true;
    }
    if (this.caseFiles().length < 1) {
      this.showFileError.set(true);
      showErrors = true;
    }
    if (showErrors || this.submitted) return;

    this.submitted = true;
    const patientCaseModel: PatientCaseModel = {
      patientId: this.patientCaseForm.get('patientId')?.value,
      name: this.patientCaseForm.get('name')?.value
    }
    const caseId = await firstValueFrom(this.patientCaseService.createPatientCase(patientCaseModel));
    for (const caseFile of this.caseFiles()) {
      await this.patientCaseService.uploadFileInChunks(caseFile.file, caseId, caseFile.progress);
    }

  }
}
