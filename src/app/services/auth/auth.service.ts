import {inject, Injectable} from '@angular/core';
import Keycloak, {KeycloakTokenParsed} from 'keycloak-js';
import {RealmRoleEnum} from '../../utils/RealmRoleEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _keycloak = inject(Keycloak);
  private tokenParsed: KeycloakTokenParsed;

  constructor() {
    this.tokenParsed = this._keycloak.tokenParsed as KeycloakTokenParsed;
  }

  public getUserName(): string {
    if (this.tokenParsed) {
      return this.tokenParsed['given_name'];
    }
    return "User Name";
  }

  public getBusinessName(): string {
    if (this.tokenParsed && this.tokenParsed['hospital'] && this._keycloak.hasRealmRole(RealmRoleEnum.HOSPITAL_ADMIN.toLowerCase())) {
      return this.tokenParsed['hospital'][0].replace("\/", "");
    }
    return "Business Name";
  }

  public hasRole(role: RealmRoleEnum): boolean {
    return this._keycloak.hasRealmRole(role.toLowerCase());
  }
}
