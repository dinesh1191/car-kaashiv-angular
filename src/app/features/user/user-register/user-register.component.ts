import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  imports: [SharedModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss',
})
export class UserRegisterComponent {
  userRegisterForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.userRegisterForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        Role: ['customer', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.matchPasswords],
      } as AbstractControlOptions,
    );
  }

  matchPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    console.log(this.userRegisterForm.value);
    if (this.userRegisterForm.invalid) {
      this.userRegisterForm.markAllAsTouched();
      this.snackbarService.show("Please fill required fields",'error');
      return;
    }
    const payload = { ...this.userRegisterForm.value };
    this.userService.registerUser(payload).subscribe({
      next: (res) => {
        const apiMessage = res?.message || 'User Registered Successfully';
        this.snackbarService.show(apiMessage, 'success');         
        this.userRegisterForm.reset();
        this.router.navigate(['/login']);           

      },
      error: (err) => {
        const apiMessage = err?.error?.message || 'User registration failed';
        this.snackbarService.show(apiMessage, 'error');
      },
    });
  }
  goBack() {
    this.router.navigate(['/login']);
  }
}
