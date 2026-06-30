import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiPaginatedResponseDTO} from '../../common/dto/ApiPaginatedResponseDTO';
import {HospitalModel} from '../../model/HospitalModel';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private readonly httpClient = inject(HttpClient);

  public getList(): Observable<ApiPaginatedResponseDTO<HospitalModel>> {
    const url = new URL("http://localhost:8084/api/hospital/list");
    return this.httpClient.get<ApiPaginatedResponseDTO<HospitalModel>>(url.toString());
  }
}
