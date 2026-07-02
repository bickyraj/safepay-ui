import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PatientCaseService } from '../../../services/patient-case/patient-case.service';
import { DecimalPipe } from '@angular/common';

interface CaseFile {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: WritableSignal<number>;
}

@Component({
  selector: 'app-create-patient-case',
  imports: [DecimalPipe],
  templateUrl: './create-patient-case.html',
  styleUrl: './create-patient-case.scss',
  standalone: true
})
export class CreatePatientCase {
  private patientCaseService = inject(PatientCaseService);

  caseFiles = signal<CaseFile[]>([]);

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
    // const patientCase = await firstValueFrom(this.patientCaseService.create(this.form.value));
    const caseId = 1; // TODO: replace with patientCase.id once form is wired up

    for (const caseFile of this.caseFiles()) {
      await this.patientCaseService.uploadFileInChunks(caseFile.file, caseId, caseFile.progress);
    }
  }
}
