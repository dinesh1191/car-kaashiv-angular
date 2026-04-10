import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';
import { SharedModule } from '../../shared/shared.module';
import { AuthFacade } from '../../core/services/auth.facade';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.usernameValidator()]],
      password: ['', Validators.required],
    });
  }

  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null; // required handles empty case

      // If input contains @, treat as email validation
      if (value.includes('@')) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@kaashiv\.com$/;

        if (!emailRegex.test(value)) {
          return { invalidCorporateEmail: true };
        }
        return null;
      }
      // Otherwise, treat as phone number validation
      if (!/^\d+$/.test(value)) {
        return { invalidPhoneNumber: true };
      }
      if (value.length !== 10) {
        return { invalidPhoneLength: true };
      }

      if (!/^[06789]/.test(value)) {
        return { invalidPhoneStart: true };
      }
      return null;
    };
  }

  login(credentials: any) {
    this.authFacade.login(credentials);
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.snackbarService.show(
        'Please fill in all required fields correctly',
        'error',
      );
      return;
    }

    this.authFacade.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.snackbarService.show(res.messsage, 'success');
      },
      error: (err) => {
        this.snackbarService.show(
          err?.error.message || 'Something went wrong Try again later',
          'error',
        );
      },
    });
  }

  navgigateToUserRegister() {
    this.router.navigate(['/register-user']);
  }

  navigateToEmpRegister() {
    this.router.navigate(['/register-employee']);
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
 
