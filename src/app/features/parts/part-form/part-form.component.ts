import { Component } from '@angular/core';

//import { FormBuilder,Validator,ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { PartService } from '../part.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part-form',
  imports: [SharedModule],
  templateUrl: './part-form.component.html',
  styleUrl: './part-form.component.scss',
})
export class PartFormComponent {
  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackbarService,
    private router: Router,
    private partService: PartService,
  ) {}
  partForm!: FormGroup;

  ngOnInit() {
    this.partForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', null],
    });
  }

  onSubmit() {      
    if (this.partForm.invalid) {
      this.snackBarService.show('Please fill the required details');
      return;
    }
    const data = { ...this.partForm.value };
    this.partService.addPart(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackBarService.show(res?.message || 'Part added successfully');
          this.router.navigate(['/parts']);
        }
      },
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.partForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}


