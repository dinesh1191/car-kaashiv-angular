import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from './material';



@NgModule({
  declarations: [],
  imports:[CommonModule,FormsModule,ReactiveFormsModule,...MATERIAL_IMPORTS],
  exports:[CommonModule,FormsModule,ReactiveFormsModule,...MATERIAL_IMPORTS]
})
export class SharedModule { }
