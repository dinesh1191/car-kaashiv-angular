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
  previewUrl: string | null = null;
  currentImageKey: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private partService: PartService,
    private snackBarService: SnackbarService,
    private uploadService: UploadService,
  ) {}

  ngOnInit() {
    //Initialize form
    this.partForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id'); //get id from url if exists
    this.partId = Number(id);
    if (this.partId) {
      this.isEditMode = true;
      this.loadPart();
    }
  }
  loadPart() {
    this.partService.getPartById(this.partId).subscribe({
      next: (res) => {
        if (res.data) {
          this.partForm.patchValue(res.data);
          this.previewUrl = res.data.imageUrl ?? null; // Show existing image in edit mode
        } else {
          this.snackBarService.show('No data found for this part.');
        }
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.selectedFile = input.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.previewUrl = URL.createObjectURL(this.selectedFile);
    this.deleteTempImageFile(); // Delete previously uploaded temp image if exists
    this.upload();
  }

  upload() {
    if (!this.selectedFile) return;
    const fileName = this.selectedFile.name;
    const contentType = this.selectedFile.type;
    let uploadedFileUrl = '';
    this.uploadService
      .getPreSignedUrl(fileName, contentType)
      .pipe(
        tap((res) => {
          // store for later use
           console.log('Presigned URL response:', res); // 👈 ADD THIS
          uploadedFileUrl = `https://carkaashiv.s3.ap-south-1.amazonaws.com/${res.key}`;
          this.currentImageKey = res.key;
        }),
        switchMap((res) =>
           {
        return this.uploadService.uploadToS3(res.uploadUrl, this.selectedFile!)
           }),
      )
      .subscribe({
        next: () => {
          //show the uploaded image
          
          this.partForm.patchValue({ imageUrl: uploadedFileUrl });
          this.previewUrl = uploadedFileUrl;
        },
        error: (err) => {
          this.snackBarService.show('Image upload failed', 'error');
        },
      });
  }

  onSubmit() {
    if (this.partForm.invalid) {
      this.partForm.markAllAsTouched();
      this.snackBarService.show('Please fill the required details', 'error');
      return;
    }
    this.savePartToApi({...this.partForm.value,imageKey:this.currentImageKey?? null});
  }
  savePartToApi(data:any){
    const res$ = this.isEditMode
      ? this.partService.updatePart(this.partId, data)
      : this.partService.addPart(data);
    res$.subscribe({
      next: () => {
        this.snackBarService.show(
          `Part ${this.isEditMode ? 'Part updated successfully' : 'Part created successfully'}`,
        );
        this.router.navigate(['/parts']);
      },
      //Error handling is done in interceptor, so no need to handle here
    });
  }
 
  deleteTempImageFile() {
    if (this.currentImageKey) {     
      this.uploadService.deleteFile(this.currentImageKey).subscribe((res) => {
        console.log(res, 'File deleted successfully');
      });
    }
  }

   ngOnDestroy() {    
    this.deleteTempImageFile();   
  }

  goBack(){
    this.router.navigate(['/parts']);
  }
}

