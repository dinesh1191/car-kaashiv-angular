import { isDevMode } from '@angular/core';

/**local development pointing**/

export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7170/api', 
  label: 'LOCAL',
  badgeClass :'env-dev',
  debug: isDevMode(),  // enables dev-only logging or features
  appVersion: '1.0.0-dev',

};




