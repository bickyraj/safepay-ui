import {inject, Injectable, WritableSignal} from '@angular/core';
import {firstValueFrom, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PatientCaseModel} from '../../model/PatientCaseModel';
import {ApiPaginatedResponseDTO} from '../../common/dto/ApiPaginatedResponseDTO';
import {AssignmentRole} from '../../pages/admin/patient-case/patient-case-detail/admin-patient-case-detail.component';

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

  public getList(): Observable<ApiPaginatedResponseDTO<PatientCaseModel>> {
    const url = new URL("http://localhost:8084/api/patient-case/all");
    return this.httpClient.get<ApiPaginatedResponseDTO<PatientCaseModel>>(url.toString())
      .pipe(
        map(response => ({
          ...response,
          content: response.content.map(d => Object.assign(new PatientCaseModel(), d))
        }))
      );
  }

  public getAllPatientCasesList(): Observable<ApiPaginatedResponseDTO<PatientCaseModel>> {
    const url = new URL("http://localhost:8084/api/patient-case/all-cases");
    return this.httpClient.get<ApiPaginatedResponseDTO<PatientCaseModel>>(url.toString())
      .pipe(
        map(response => ({
          ...response,
          content: response.content.map(d => Object.assign(new PatientCaseModel(), d))
        }))
      );
  }

  public getAllPatientCasesListByDoctor(): Observable<ApiPaginatedResponseDTO<PatientCaseModel>> {
    const url = new URL("http://localhost:8084/api/doctor/patient-cases");
    return this.httpClient.get<ApiPaginatedResponseDTO<PatientCaseModel>>(url.toString())
      .pipe(
        map(response => ({
          ...response,
          content: response.content.map(d => Object.assign(new PatientCaseModel(), d))
        }))
      );
  }

  public getPatientCaseDetailWithDocumentsByCaseId(caseId: number): Observable<PatientCaseModel> {
    const url = new URL("http://localhost:8084/api/patient-case/" + caseId);
    return this.httpClient.get<PatientCaseModel>(url.toString())
      .pipe(
        map(response => Object.assign(new PatientCaseModel(), response))
      );
  }

  public assignDoctorToCase(doctorId: number, caseId: number, role: AssignmentRole): Observable<boolean> {
    const url = new URL("http://localhost:8084/api/patient-case/assign-case");
    return this.httpClient.post<boolean>(url.toString(), {
      doctorId: doctorId,
      patientCaseId: caseId,
      role: role
    });
  }
}
