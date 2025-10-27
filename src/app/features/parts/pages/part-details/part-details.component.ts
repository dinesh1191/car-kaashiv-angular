import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartService } from '../../services/part.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../../../core/services/loader.service';
import { MATERIAL_IMPORTS } from '../../../../shared/material';
import { CommonModule } from '@angular/common';
import { getFormattedTimestamp } from '../../../../shared/utils/date-utlis';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-part-details',
  imports: [...MATERIAL_IMPORTS, RouterLink,CommonModule,ReactiveFormsModule],
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
  private snackBar:MatSnackBar,
  private loaderService:LoaderService,
 
){ }

ngOnInit(){
  //Initialize form
  this.partForm = this.fb.group({    
    pName:['',Validators.required,],
    part_detail:['',Validators.required],
    part_price:['',Validators.required,Validators.min(0)],
    pStock:['',Validators.required,Validators.min(0)],
    part_image:['',Validators.required]    
  })  

 console.log("on init triggered")
  this.route.paramMap.subscribe(p=>{
      this.partId = +p.get('partId')!
    });    
  console.log("paramMap partId",this.partId)
    
    if(this.partId){
      this.isEditMode = true
      this.loaderService.show();
      this.partService.getPartbyId(this.partId).subscribe({
        next:(res)=>{
          console.log('api called>>>>')
          this.loaderService.hide();     
          if(res.data){
             this.partForm.patchValue(res.data);
        } else {
          this.snackBar.open('No data found for this part.', 'Close', { duration: 2500 });
        }
        },
        error:(err)=>{
          this.snackBar.open('Something went wrong'+{err},'Close',{duration:2500})
        }
      })      
    }

  
}

ngViewDidEnter(){
 

}

onFileSelected(event:Event):void{
const input = event.target as HTMLInputElement;
if(input.files && input.files.length > 0){
   this.selectedFile = input.files[0];
   this.selectedFileName = this.selectedFile.name
}
this.partForm.patchValue({'part_image':this.selectedFileName})

}


onsumbit(){
  // Manually mark the hidden file input as 'touched' so validation errors (like required) show up on submit
  this.partForm.get('part_image')?.markAsTouched();
   if(this.partForm.invalid){
     this.snackBar.open("Please fill the required details", 'Close',{duration:3000})
      return;
  }
  const empId = this.authService.getCurrentUser();
    const data = { ...this.partForm.value,emp_id:empId,idt:getFormattedTimestamp,}
    const formData = this.partService.buildFormData(data,)

    this.loaderService.show()
    this.partService.addPart(formData).subscribe({
      next:(res)=>{
          if(res){
            this.loaderService.hide()
            this.snackBar.open(res?.message || "Part added successfully","Close",{duration:3000})
            this.router.navigate(['/parts']);
          }
      },
      error:()=> {
        this.loaderService.hide()
        this.snackBar.open("something went wrong. Try again.",'Close', {duration:3000 })}
    })
   }
  
}





