import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApiPaginatedResponseDTO} from '../../common/dto/ApiPaginatedResponseDTO';
import {UserModel} from '../../model/UserModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  public getList(): Observable<ApiPaginatedResponseDTO<UserModel>> {
    const url = new URL(`${this.apiUrl}/user/list`);

    return this.httpClient.get<ApiPaginatedResponseDTO<UserModel>>(url.toString())
      .pipe(
        map(response => ({
          ...response,
          content: response.content.map(d => Object.assign(new UserModel(), d))
        }))
      );
  }
}
