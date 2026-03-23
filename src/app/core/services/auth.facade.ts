import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';

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
        customer:'user',
        staff:'/employee/emp-dashboard',
        admin:'/employee/emp-dashboard',
        superAdmin:'/admin',
    };
    return routeMap[role] || '/unauthorized';
    }
}