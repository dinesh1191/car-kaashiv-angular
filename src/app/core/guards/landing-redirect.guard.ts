import { CanActivateFn, Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const landingRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const actRouter = inject(Router);  
  const currentUser = authService.currentUser; 
  
  if (currentUser) {
    if(currentUser.role === "customer"){
      actRouter.navigate(['/user/parts-dashboard'],{replaceUrl:true});
    } else {
     actRouter.navigate(['/employee/emp-dashboard'],{replaceUrl:true});
    }
    return false; // Prevent access to landing page for authenticated users
  
    }
      return true;
};
