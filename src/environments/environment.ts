import { isDevMode } from '@angular/core';

export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7170/api',
  debug: isDevMode(),  // enables dev-only logging or features
  appVersion: '1.0.0-dev',
};
