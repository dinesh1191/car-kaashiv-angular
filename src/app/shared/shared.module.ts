import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from './material';
import { PRIME_IMPORTS } from './prime';



@NgModule({
  declarations: [],
  imports:[CommonModule,FormsModule,ReactiveFormsModule,...MATERIAL_IMPORTS,...PRIME_IMPORTS],
  exports:[CommonModule,FormsModule,ReactiveFormsModule,...MATERIAL_IMPORTS,...PRIME_IMPORTS]
})
export class SharedModule { }
