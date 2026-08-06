import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import {ApiPaginatedResponseDTO} from '../../common/dto/ApiPaginatedResponseDTO';
import {UserModel} from '../../model/UserModel';
import { environment } from '../../../environments/environment';
import {ApiResponseDTO} from '../../common/dto/ApiResponseDTO';


export interface CreateUserDTO {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  username: string;
}

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

  public createUser(createUserDTO: CreateUserDTO): Observable<boolean> {
    const url = new URL(`${this.apiUrl}/user/create`);
    return this.httpClient.post<ApiResponseDTO<[]>>(url.toString(), createUserDTO).pipe(
      map(response => response.status || false)
    );
  }
}
