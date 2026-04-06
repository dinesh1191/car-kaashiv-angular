import { CanActivateFn,Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
const authService = inject(AuthService);
const router = inject(Router);

const currentUser = authService.currentUser;
const allowedRoles = route.data?.['roles'] as string[];

if(!currentUser){
  router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
  return of(false);
}
//Check if user's role is allowed
if(allowedRoles.includes(currentUser.role)){
  return of(true);
}
router.navigate(['/unauthorized'],{replaceUrl:true});
return of(false);
};

