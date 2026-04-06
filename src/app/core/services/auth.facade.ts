import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthFacade{
    constructor(
        private authService :AuthService,
        private router:Router
    ){}
    //Role based navigation 
    navigateByRole(role:string){
    const routeMap:Record<string,string>={
        customer:'user/parts-dashboard',
        //staff:'/employee/emp-dashboard',
        employee:'/employee/emp-dashboard',
        admin:'/employee/emp-dashboard',
        superAdmin:'/admin',
    };
    return routeMap[role] || '/unauthorized';
    }

    login(credentials: any) {
    return this.authService.login(credentials).pipe(
        tap(() =>{
            // Mark Logged in
            this.authService.isLoggedIn = true;//// sets user has valid cookie
            // Fetch user profile immediately after login     
            this.authService.getUserProfile().subscribe({
                next:(profile)=>{
                    const role = profile.data.role;
             //navigate based on role
                const route = this.navigateByRole(role);
                this.router.navigate([route]);
                },
                error:() =>{
                    console.warn('Failed to fetch user profile');
                    this.router.navigate(['/unauthorised'])
                }                
            });
        })
    );     
  }
  logout(){
    this.authService.logout().subscribe({
        next:()=>{
            //clear session
            this.authService.clearUserProfile();
            //navigate to login
            this.router.navigate(['/login']);
        },
        error:()=>{
         console.error('Logout Failed');
         //fallback safety
         this.authService.clearUserProfile();
         this.router.navigate(['/login']);
        }
    });
  }
  
}