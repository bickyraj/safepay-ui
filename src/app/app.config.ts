import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  includeBearerTokenInterceptor,
} from 'keycloak-angular';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideKeycloakAngular} from './providers/KeycloakProvider';
import {environment} from '../environments/environment';

const apiUrl = environment.apiUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: new RegExp(`^${apiUrl}(/.*)?$`, 'i'),
  bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition],
    },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideRouter(routes)
  ]
};
