import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError,throwError } from 'rxjs';

let lastVisitedUrl = '/parts-list'; // fallback on first load

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);


  // Track last valid route before making requests
  if (!req.url.includes('/login')) {
    lastVisitedUrl = router.url || lastVisitedUrl;
  }



  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.warn('Interceptor caught 401 Unauthorized');

        // Clear user session and cached data
        authService.clearUserProfile();
        // Redirect to login with last visited route
        router.navigate(['/auth'], { queryParams: { returnUrl: lastVisitedUrl } 
        });        
      }

      // Re-throw error for global handling or logging
      return throwError(() => error);
    })
  );
};