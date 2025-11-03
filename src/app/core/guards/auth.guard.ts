import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map,catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);  //inject used to access service inside a standalone function
  const router = inject(Router);

  // const tokenExists   = authService.hasAuthCookie();

  /** Check if user profile is already in BehavoirSubject*/
  const currentUser = authService.currentUser;
  if(currentUser){    
    return true; //already logged in and profile present
  }
  
  /** Try fetching user form session or auth/me */
   return authService.getUserProfile().pipe(
    map(() => true),
    catchError(() => {
      // Clear user and redirect to login with returnUrl
      authService.clearUserProfile();
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
   );     
};
