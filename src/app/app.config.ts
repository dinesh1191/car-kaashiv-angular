import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MATERIAL_IMPORTS } from './shared/material';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { apiResponseInterceptor } from './core/interceptors/api-response.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { provideAppInitializer } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiResponseInterceptor])),//enables Angular’s HTTP client for your standalone components and services.
    provideAnimations(),
    importProvidersFrom(BrowserAnimationsModule,MATERIAL_IMPORTS,ReactiveFormsModule),
    provideAppInitializer(() => 
    { //executes below function during app bootstrap.
      const authService = inject(AuthService);
      return authService.initUserSession();
    }),
  ]
};
