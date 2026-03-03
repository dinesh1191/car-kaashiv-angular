import { isDevMode } from '@angular/core';

/**local development pointing**/
export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7170', 
  debug: isDevMode(),  // enables dev-only logging or features
  appVersion: '1.0.0-dev',
};

/**use below production pointing**/

// export const environment = {
//   production: false,
//   apiBaseUrl: 'https://carkaashiv-angular-api.onrender.com/api',
//   debug: isDevMode(),  // enables dev-only logging or features
//   appVersion: '1.0.0-dev',
// };

