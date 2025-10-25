import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators, ReactiveFormsModule, } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../core/services/loader.service';

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
    private snackBar:MatSnackBar
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
    this.loaderService.show();
    this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{      
       this.loaderService.hide()      
       this.router.navigate(['/parts-list']);
       this.loaderService.show();
      },
      error:(err)=>{      
        this.loaderService.hide();
        this.snackBar.open('Invalid credentials,'+{ err},'Close',{duration:2500})
      }       
    })     
    }
 
}
