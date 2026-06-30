import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApiPaginatedResponseDTO} from '../../common/dto/ApiPaginatedResponseDTO';
import {DoctorModel} from '../../model/DoctorModel';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {

  private readonly httpClient = inject(HttpClient);

  public getList(): Observable<ApiPaginatedResponseDTO<DoctorModel>> {
    const url = new URL("http://localhost:8084/api/doctor/list");

    return this.httpClient.get<ApiPaginatedResponseDTO<DoctorModel>>(url.toString())
      .pipe(
        map(response => ({
          ...response,
          content: response.content.map(d => Object.assign(new DoctorModel(), d))
        }))
      );
  }
}
