import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiPaginatedResponseDTO} from '../../common/dto/ApiPaginatedResponseDTO';
import {HospitalModel} from '../../model/HospitalModel';
import {ApiResponseDTO} from '../../common/dto/ApiResponseDTO';
import {UserModel} from '../../model/UserModel';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private readonly httpClient = inject(HttpClient);

  public getList(): Observable<ApiPaginatedResponseDTO<HospitalModel>> {
    const url = new URL("http://localhost:8084/api/hospital/list");
    return this.httpClient.get<ApiPaginatedResponseDTO<HospitalModel>>(url.toString());
  }

  public getByHospitalId(hospitalId: number): Observable<ApiResponseDTO<HospitalModel>> {
    const url = new URL("http://localhost:8084/api/hospital/" + hospitalId);
    return this.httpClient.get<ApiResponseDTO<HospitalModel>>(url.toString());
  }

  public getAllStaffByHospitalId(hospitalId: number): Observable<ApiPaginatedResponseDTO<UserModel>> {
    const url = new URL("http://localhost:8084/api/hospital/" + hospitalId + "/staffs");
    return this.httpClient.get<ApiPaginatedResponseDTO<UserModel>>(url.toString());
  }
}
