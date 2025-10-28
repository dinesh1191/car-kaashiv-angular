import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);//inject used to access service inside a standalone function
  const router = inject(Router);
  const tokenExists   = authService.hasAuthCookie();
  console.warn("toekn esixtss",tokenExists)
  
  if(tokenExists) return true
   router.navigate(['/auth'],{queryParams:{returnUrl:state.url}}); //programmatically changes the URL to /login passes along the original URL (e.g., /dashboard) — useful for redirecting back after login.
   return false; //Cancel the current navigation — don’t load that route."
     
};
