import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiPaginatedResponseDTO} from '../../common/dto/ApiPaginatedResponseDTO';
import {HospitalModel} from '../../model/HospitalModel';
import {ApiResponseDTO} from '../../common/dto/ApiResponseDTO';
import {UserModel} from '../../model/UserModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private readonly httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  public getList(): Observable<ApiPaginatedResponseDTO<HospitalModel>> {
    const url = new URL(`${this.apiUrl}/hospital/list`);
    return this.httpClient.get<ApiPaginatedResponseDTO<HospitalModel>>(url.toString());
  }

  public getByHospitalId(hospitalId: number): Observable<ApiResponseDTO<HospitalModel>> {
    const url = new URL(`${this.apiUrl}/hospital/` + hospitalId);
    return this.httpClient.get<ApiResponseDTO<HospitalModel>>(url.toString());
  }

  public getAllStaffByHospitalId(hospitalId: number): Observable<ApiPaginatedResponseDTO<UserModel>> {
    const url = new URL(`${this.apiUrl}/hospital/` + hospitalId + "/staffs");
    return this.httpClient.get<ApiPaginatedResponseDTO<UserModel>>(url.toString());
  }

  public getAllUsersNotInHospital(hospitalId: number): Observable<ApiResponseDTO<UserModel[]>> {
    const url = new URL(`${this.apiUrl}/hospital/` + hospitalId + "/staffs/not-in-hospital");
    return this.httpClient.get<ApiResponseDTO<UserModel[]>>(url.toString());
  }

  public addUsersToHospital(hospitalId: number, userIds: number[], role: string): Observable<boolean> {
    const url = new URL(`${this.apiUrl}/hospital/` + hospitalId + "/staffs/add");
    return this.httpClient.post<boolean>(url.toString(), { userIds, role });
  }
}
