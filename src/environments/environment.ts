import { isDevMode } from '@angular/core';

/**local development pointing**/
export const environment = {
  production: true,
  apiBaseUrl: 'https://localhost:7170', 
  label: 'DEV',
  badgeClass :'env-dev',
  debug: isDevMode(),  // enables dev-only logging or features
  appVersion: '1.0.0-dev',

};

/**use below production pointing**/

// export const environment = {
//   production: false,
//   apiBaseUrl: 'https://carkaashiv-angular-api.onrender.com',
//   debug: isDevMode(),  // enables dev-only logging or features
//   appVersion: '1.0.0-dev',
//   label: 'PROD',
//   badgeClass: 'env-prod'
// };

