import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map,catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);  //inject used to access service inside a standalone function
  const router = inject(Router);

  // const tokenExists   = authService.hasAuthCookie();

  //1.check if user profile is already in BehavoirSubject
  const currentUser = authService.currentUser;
  if(currentUser){
    return true; //already logged in and profile present
  }
  // 2.Try fetching user form session or auth/me
   return authService.getUserProfile().pipe(
    map((response)=>{
      if(response?.data || authService.currentUser){
        return true;
      } else {
        router.navigate(['/auth'],{queryParams:{returnUrl:state.url}});
        return false;
      }
    }),
    catchError(()=>{
      router.navigate(['/auth',{queryParams:{returnUrl:state.url}}])
    return of(false);
    })
   );

  
 
     
};
