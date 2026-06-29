import {AutoRefreshTokenService, provideKeycloak, UserActivityService, withAutoRefreshToken} from 'keycloak-angular';
import {EnvironmentProviders} from '@angular/core';

export const provideKeycloakAngular = (): EnvironmentProviders => {
  return provideKeycloak({
    config: {
      url: 'http://localhost:8082',
      realm: 'safepay',
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
