import { ApplicationConfig } from '@angular/core';
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
  ]
};
