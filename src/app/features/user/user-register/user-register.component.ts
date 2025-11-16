import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-register',
  imports: [SharedModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss',
})
export class UserRegisterComponent {
  userRegisterForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackbarService:SnackbarService,
    private messageService: MessageService
    ) {
      this.userRegisterForm = this.fb.group(
        {
          name: ['', [Validators.required, Validators.minLength(3)]],
          phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        },
        {
          validators: [this.matchPasswords],
        } as AbstractControlOptions
      );
    }

    matchPasswords(control :AbstractControl):ValidationErrors | null{

      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null: {mismatch:true};
    }


      onSubmit(){
        if(this.userRegisterForm.invalid){
          this.userRegisterForm.markAllAsTouched();
          return;
        }
        const payload = {
            ...this.userRegisterForm.value,
            createdAt: new Date()
        };
        this.userService.registerUser(payload).subscribe({
          next:(res)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User Registered Successfully',
        });
        this.userRegisterForm.reset();
          },
          error :()=>{
            this.snackbarService.show('User registration failed','error');
          }
        })
      }

}
