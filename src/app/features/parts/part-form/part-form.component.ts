import { Component } from '@angular/core';

//import { FormBuilder,Validator,ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-part-form',
  imports: [SharedModule],
  templateUrl: './part-form.component.html',
  styleUrl: './part-form.component.scss',
})
export class PartFormComponent {
  constructor(private fb: FormBuilder) {}
partForm!:FormGroup;

ngOnInit(){
  this.partForm = this.fb.group({  
    name: ['', Validators.required, Validators.minLength(100)],
    description: ['', Validators.required, Validators.minLength(100)],
    price: [0, Validators.required, Validators.min(0)],
    stockQuantity: [0, Validators.required, Validators.min(0)],
    imagePath: ['', null],
  });
}

  onSubmit() {
    if (this.partForm.valid) return console.log(this.partForm.value);
  }
  isInvalid(controlName: string): boolean {
  const control = this.partForm.get(controlName);
  return !!(control && control.invalid && control.touched);
}
}


