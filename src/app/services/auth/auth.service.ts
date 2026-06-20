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
    if (this.tokenParsed && this.tokenParsed['tenant'] && this._keycloak.hasRealmRole(RealmRoleEnum.USER)) {
      return this.tokenParsed['tenant'][0].replace("\/", "");
    }
    return "Business Name";
  }
}
