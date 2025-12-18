import { isDevMode } from '@angular/core';

// export const environment = {
//   production: false,
//   apiBaseUrl: 'https://localhost:7170',
//   debug: isDevMode(),  // enables dev-only logging or features
//   appVersion: '1.0.0-dev',
// };

//production pointing

export const environment = {
  production: false,
  apiBaseUrl: 'https://carkaashiv-angular-api.onrender.com', // placeholder for future real API endpoint
  debug: isDevMode(),  // enables dev-only logging or features
  appVersion: '1.0.0-dev',
};

