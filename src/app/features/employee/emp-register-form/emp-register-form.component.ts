import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-emp-register-form',
  imports: [SharedModule],
  templateUrl: './emp-register-form.component.html',
  styleUrl: './emp-register-form.component.scss',
})
export class EmpRegisterFormComponent {
  registerForm!: FormGroup;

  roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Staff', value: 'Staff' },
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@kaashiv\.com$/),
          ],
        ],
        role: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[{\]};:<>|./?,-]).{8,10}$/
            ),
          ],
        ],
        cpassword: ['', Validators.required],
      },
      {
        validators: this.matchPasswords('password', 'cpassword'),
      }
    );
  }

  matchPasswords(pass: string, confirm: string) {
    return (form: FormGroup) => {
      const password = form.get(pass)?.value;
      const confirmPass = form.get(confirm)?.value;
      if (password !== confirmPass) {
        form.get(confirm)?.setErrors({ mismatch: true });
      } else {
        form.get(confirm)?.setErrors(null);
      }
    };
  }

  onSubmit() {
    
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid:', this.registerForm.errors);      
      return;
    }

    const payload = {
      ...this.registerForm.value,      
    };

    this.employeeService.registerEmployee(payload).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Registered Successfully',
        });
        this.registerForm.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to Register Employee',
        });
      },
    });
  }

  
} 