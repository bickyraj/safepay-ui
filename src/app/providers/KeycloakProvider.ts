import {AutoRefreshTokenService, provideKeycloak, UserActivityService, withAutoRefreshToken} from 'keycloak-angular';
import {EnvironmentProviders} from '@angular/core';
import {environment} from '../../environments/environment';

export const provideKeycloakAngular = (): EnvironmentProviders => {
  const keycloakUrl = environment.keycloakUrl;

  return provideKeycloak({
    config: {
      url: keycloakUrl,
      realm: 'hms',
      clientId: 'hms-frontend',
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
  })
}
