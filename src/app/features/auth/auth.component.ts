import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators, ReactiveFormsModule, } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../core/services/loader.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-auth',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule,...MATERIAL_IMPORTS],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  loginForm!:FormGroup;
   submitted = false;
   loading = false;

   constructor(
    private fb:FormBuilder,
    private authService :AuthService,
    private loaderService :LoaderService,
    private router :Router,
    private route:ActivatedRoute,
    private snackbarService:SnackbarService,
   
  ){ }

   ngOnInit(){
        this.loginForm = this.fb.group({
        username:['',Validators.required],
        password:['',Validators.required]
      });   
       
   }

   onSubmit(){    
    this.submitted = true;
      if(this.loginForm.invalid){
        return;     
     }
    
    this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{             
       this.authService.isLoggedIn = true; // sets user has valid cookie
       this.authService.getUserProfile().subscribe(()=>{
       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'parts-list';//know from where route  came from
       this.router.navigateByUrl(returnUrl);
       this.snackbarService.show(res.message);

       });
        
      },
      error:(err)=>{   
                     
        this.snackbarService.show('Something went wrong Try again later','error',err)
      }       
    })     
    }
 
}
