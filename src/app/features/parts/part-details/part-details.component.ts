import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { PartService } from '../part.service';
import { LoaderService } from '../../../core/services/loader.service';
import { SharedModule } from '../../../shared/shared.module';
import { UploadService } from '../../../core/services/upload.service';
import { switchMap,tap } from 'rxjs';


@Component({
  selector: 'app-part-details',
  imports: [SharedModule, CommonModule],
  templateUrl: './part-details.component.html',
  styleUrl: './part-details.component.scss',
})
export class PartDetailsComponent {
  partForm!: FormGroup;
  isEditMode = false;
  partId!: number;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  previewUrl: any=null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private partService: PartService,
    private snackBarService: SnackbarService,
    private loaderService: LoaderService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    //Initialize form
    this.partForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['',Validators.required],
    });

    this.loaderService.show;

    const id = this.route.snapshot.paramMap.get('id'); //get id from url if exists
    console.log('Recieved id' + id);
    this.partId = +id!;
    this.uploadService.testS3().subscribe({
      next:(res)=>{console.log('S3 Test successful', res)},
      error:(err)=>{console.error('S3 Test failed', err)}
    })

    if (this.partId) {
      this.isEditMode = true;
      this.loadPart();
    }
  }
  loadPart() {
    this.partService.getPartbyId(this.partId).subscribe({
      next: (res) => {
        if (res.data) {
          this.snackBarService.show('Part fetched successfully.');

          this.partForm.patchValue(res.data);  
          console.log('Part data', res.data);
          this.previewUrl = res.data.imageUrl; // Show existing image in edit mode      
        } else {
          this.snackBarService.show('No data found for this part.');
        }
      }     
    });
  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    if(!input.files?.length) return;
    this.selectedFile = input.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.previewUrl = URL.createObjectURL(this.selectedFile);
     this.upload();
  }

  upload(){
    debugger
    console.log('Uploading file', this.selectedFile);
    if(!this.selectedFile)return;
    const fileName = this.selectedFile.name;
    const contentType = this.selectedFile.type;
        let s3FileUrl = '';
      this.uploadService.getPreSignedUrl(fileName, contentType)
      .pipe(
        tap(res=>{        
          console.log('Received pre-signed URL', res);
           // store for later use
           debugger
        s3FileUrl = res.fileUrl;      
        }),
        switchMap((res=>         
        this.uploadService.uploadToS3(res.uploadUrl,this.selectedFile!)                
      )
    )).subscribe({
      next:()=>{console.log('File uploaded successfully')
          //show the uploaded image
          console.log('S3 file URL:', s3FileUrl);
          debugger
           this.partForm.patchValue({imageUrl: s3FileUrl}); 
          this.previewUrl = s3FileUrl; 


      },     
      error:(err)=>{console.error('Error uploading file',err)}
    }) 
}

  onSumbit() {
    debugger
    if (this.partForm.invalid) {
      this.partForm.markAllAsTouched(); 
      this.snackBarService.show('Please fill the required details',"error");
      return;
    }
    this.savePart();
   } 
 
   savePart(){
    debugger
      const data = {...this.partForm.value};
      debugger
      const res$ = this.isEditMode
      ?this.partService.updatePart(this.partId, data)
      :this.partService.addPart(data);

      res$.subscribe({    
        next:()=>{
          this.router.navigate(['/parts']);
        } 
        //Error handling is done in interceptor, so no need to handle here      
    });
 }
}

