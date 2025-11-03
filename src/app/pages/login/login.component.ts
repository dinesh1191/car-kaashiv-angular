import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,...MATERIAL_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
       console.log("returnUrl >>>",returnUrl);
       this.router.navigate(['/parts-list']);

       this.snackbarService.show(res.message);

       });
        
      },
      error:(err)=>{   
                     
        this.snackbarService.show('Something went wrong Try again later','error',err)
      }       
    })     
    }





}
