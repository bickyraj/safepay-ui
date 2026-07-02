import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {firstValueFrom, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PatientCaseModel} from '../../model/PatientCaseModel';

@Injectable({
  providedIn: 'root',
})
export class PatientCaseService {
  private readonly httpClient = inject(HttpClient);

  public createPatientCase(patientCase: PatientCaseModel): Observable<number> {
    const url = new URL("http://localhost:8084/api/patient-case/create");
    return this.httpClient.post<number>(url.toString(), patientCase);
  }

  async uploadFileInChunks(file: File, caseId: number, progress: WritableSignal<number>): Promise<void> {
    // const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk
    const CHUNK_SIZE = 20 * 1024;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = crypto.randomUUID();

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('file', chunk, file.name);
      formData.append('uploadId', uploadId);
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('fileName', file.name);

      await firstValueFrom(
        this.httpClient.post(`http://localhost:8084/api/patient-case/${caseId}/documents/upload-chunk`, formData)
      );

      const percent = Math.round(((chunkIndex + 1) / totalChunks) * 100);
      progress.set(percent);
    }

    // all chunks uploaded — tell backend to merge them
    await firstValueFrom(
      this.httpClient.post<boolean>(`http://localhost:8084/api/patient-case/${caseId}/documents/complete-upload`, {
        uploadId,
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size,
        totalChunks
      })
    );
  }
}
