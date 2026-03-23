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
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private authFacade:AuthFacade
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(credentials: any) {
    //return this.authService.login(credentials);
    this.authFacade.login(credentials)
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;   

    this.authFacade.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.snackbarService.show(res.messsage,'success');     
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
    //console.warn(this.router.config);
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
 
