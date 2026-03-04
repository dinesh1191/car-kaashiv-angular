import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { PartService } from '../part.service';
import { LoaderService } from '../../../core/services/loader.service';
import { SharedModule } from '../../../shared/shared.module';


@Component({
  selector: 'app-part-details',
  imports: [SharedModule,CommonModule],
  templateUrl: './part-details.component.html',
  styleUrl: './part-details.component.scss'
})
export class PartDetailsComponent {
partForm!:FormGroup;
isEditMode = false;
partId! :number;
selectedFile: File |  null = null;
selectedFileName: string |null = null ;


constructor(
  private fb:FormBuilder,
  private router:Router,
  private route:ActivatedRoute,
  private partService:PartService,
  private authService:AuthService,
  private snackBarService:SnackbarService,
  private loaderService:LoaderService,
 
){ }

ngOnInit(){
  //Initialize form
  this.partForm = this.fb.group({    
    name:['',Validators.required,],
    description:['',Validators.required],
    price:['',[Validators.required,Validators.min(0)]],
    stock:['',[Validators.required,Validators.min(0)]],
    imageUrl:['']    
  })  


this.loaderService.show;

  const id =this.route.snapshot.paramMap.get('id') //get id from url if exists
  console.log("Recieved id"+id)
  this.partId = +id!;

    
    if(this.partId){
     this.isEditMode = true;      
      this.partService.getPartbyId(this.partId).subscribe({
        next:(res)=>{       
          if(res.data){
             this.snackBarService.show('Part fetched successfully.');
             this.partForm.patchValue(res.data);
        
             console.log("Form value after patch:", this.partForm.value);
       
        } else {
          this.snackBarService.show('No data found for this part.');
        }
        },
        error:(err)=>{
          this.snackBarService.show('Something went wrong',err);
        }
      })      
    }  
}

onFileSelected(event:Event):void{
const input = event.target as HTMLInputElement;
if(input.files && input.files.length > 0){
   this.selectedFile = input.files[0];
   this.selectedFileName = this.selectedFile.name
}
this.partForm.patchValue({'imagePath':this.selectedFileName})

}


onsumbit(){
  // Manually mark the hidden file input as 'touched' so validation errors (like required) show up on submit
  // this.partForm.get('imagePath')?.markAsTouched();
  console.log("Submitting form with value:", this.partForm.value);
   if(this.partForm.invalid){
     this.snackBarService.show("Please fill the required details")
      return;
  }
    const data = { ...this.partForm.value}
    //const formData = this.partService.buildFormData(data,)

    this.loaderService.show()
    this.partService.updatePart(this.partId,data).subscribe({
      next:(res)=>{
          if(res){
            this.loaderService.hide()
            this.snackBarService.show(res?.message);
            this.router.navigate(['/parts']);
          }
      },
      error:(err)=> {
        this.loaderService.hide()
        this.snackBarService.show("something went wrong. Try again.",err)}
    })
   }
  
}





