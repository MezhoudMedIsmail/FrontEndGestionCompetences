import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideClientHydration} from "@angular/platform-browser";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {EntryService} from "./Services/entry.service";
import {TokenService} from "./Services/token.service";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {intAuthInterceptor} from "./Interceptor/int-auth.interceptor";
import {DataService} from "./Services/data.service";
import {JwtModule} from "@auth0/angular-jwt";
export function tokenGetter() {
  return localStorage.getItem("TOKEN_KEY");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    EntryService,
    TokenService,
    provideHttpClient(withInterceptors([intAuthInterceptor])),
    DataService, provideAnimationsAsync(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["http://localhost:8088/api/"],
        },
      }),
    ),
  ]
};
