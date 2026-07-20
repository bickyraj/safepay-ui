import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApiPaginatedResponseDTO} from '../../common/dto/ApiPaginatedResponseDTO';
import {DoctorModel} from '../../model/DoctorModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {

  private readonly httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  public getList(): Observable<ApiPaginatedResponseDTO<DoctorModel>> {
    const url = new URL(`${this.apiUrl}/doctor/list`);

    return this.httpClient.get<ApiPaginatedResponseDTO<DoctorModel>>(url.toString())
      .pipe(
        map(response => ({
          ...response,
          content: response.content.map(d => Object.assign(new DoctorModel(), d))
        }))
      );
  }
}
