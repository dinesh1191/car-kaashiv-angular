import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUser;

  if (currentUser) {
    if (currentUser.role === 'customer') {
      router.navigate(['/user/parts-dashboard'], { replaceUrl: true });
    } else {
      router.navigate(['/employee/emp-dashboard'], { replaceUrl: true });
    }
    return false;
  }
  return true;
};
