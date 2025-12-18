import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MATERIAL_IMPORTS } from '../../shared/material';
import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { PRIME_IMPORTS } from '../../shared/prime';
import { SharedModule } from '../../shared/shared.module';




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
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {   
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.isLoggedIn = true; // sets user has valid cookie
        //  Fetch user profile immediately after login
        this.authService.getUserProfile().subscribe({
          next: (profile) => {
            const role = profile.data.role;

            if (role === 'customer') {
              this.router.navigate(['/user']);
            } else if (role === 'staff' || 'admin') {
              this.router.navigate(['/emp-dashboard']);
            } else {
              this.router.navigate(['/unauthorized']);
            }       
            this.snackbarService.show(res.message);
          },
          error: (err) => {
            this.snackbarService.show('Unable to load user profile', 'error');
          },
        });
      },
      error: (err) => {
        this.snackbarService.show('Something went wrong Try again later','error', err);
      },
    });
  }

  nvagigateToRegister() {
    this.router.navigate(['/user/register-user']);
  }

  nvagigateToEmpRegister() {
    this.router.navigate(['/employee/register-employee']);
  }
}
