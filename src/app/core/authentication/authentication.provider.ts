import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { authenticationInterceptor } from './interceptors/authentication.interceptor';
import { AuthenticationService } from './services/authentication.service';

export const provideAuthentication = (): Array<Provider | EnvironmentProviders> =>
{
  return [
    provideHttpClient( withInterceptors( [ authenticationInterceptor ] ) ),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject( AuthenticationService ),
      multi: true,
    },
  ];
};
