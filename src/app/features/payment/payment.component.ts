import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../core/services/upload.service';
import { switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-payment',
  imports: [SharedModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  orderId?: number;
  OrderDetails: any;
  CustomerName?: string | null;
  CustomerEmail?: string | null;
  order: any;
  qrCodeUrl = '';
  previewUrl: string | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;
  payment = {
  utrNumber: ''
};
  currentImageKey: any;

  constructor(
    private activatedRoute: ActivatedRoute,   
    private orderService: OrderService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private uploadService: UploadService,    
    private fb: FormBuilder,
    private snackBarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      // this.orderId = Number(params.get('id'));
       this.orderId = 105;
      // Initialize form
       this.paymentForm = this.fb.group({
        utrNumber: [''],
        proofImage: [null, Validators.required]
  });

      if (this.orderId) {
        this.orderService.getOrderById(this.orderId).subscribe({
          next: (res) => {
            this.OrderDetails = res;
            this.snackbarService.show('Order details loaded successfully!', 'success');
          },
          error: (err) => {
            this.snackbarService.show('Failed to load order details', 'error', 3000, err);
          },
        });
      }
    });

    this.CustomerName = this.authService.currentUser?.name;
    this.CustomerEmail = this.authService.currentUser?.email;
  }
 
  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (!input.files?.length) return;
      this.selectedFile = input.files[0];
     // this.selectedFileName = this.proof;
      this.previewUrl = URL.createObjectURL(this.selectedFile);
      this.deleteTempImageFile(); // Delete previously uploaded temp image if exists
      this.upload();
    }
  
    upload() {
      debugger
      if (!this.selectedFile) return;
      const fileName = this.selectedFile.name;
      const contentType = this.selectedFile.type;
      let uploadedFileUrl = '';
      this.uploadService.getPreSignedUrl(fileName, contentType)
        .pipe(
          tap((res) => {
            // store for later use          
            this.currentImageKey = res.key;
            uploadedFileUrl=res.fileUrl
          }),
          switchMap((res) =>
             {
              console.log('Calling PUT upload...'); // 
               return this.uploadService.uploadToS3(res.uploadUrl, this.selectedFile!)         
        }),  
        )
        .subscribe({
          next: () => {             
            this.paymentForm.patchValue({ proofImage: uploadedFileUrl});
            this.previewUrl = uploadedFileUrl;   // to frontend display  
             this.paymentForm.get('proofImage')?.updateValueAndValidity();
          },
          error: (err) => {
            this.snackBarService.show('Image upload failed', 'error');
            console.log('Image upload failed',err)
          },
        });
    }

    deleteTempImageFile() {
    if (this.currentImageKey?.startsWith(("temp/"))) {     
      this.uploadService.deleteFile(this.currentImageKey).subscribe((res) => {
        console.log(res, 'File deleted successfully');
      });
    }
  }

  submitPaymentProof(): void {
    if (!this.orderId) {
      this.snackbarService.show('Order ID is missing', 'error');
      return;
    }
  
    const tempKey = this.previewUrl?.substring(this.previewUrl?.indexOf('temp/'));
    var data = {
      PaymentReference: this.paymentForm.value.utrNumber,
      tempKey: tempKey,
    };    
    this.orderService.submitPaymentById(this.orderId, data).subscribe({
      next: (res) => {  
        this.snackbarService.show('Payment proof submitted successfully!', 'success');
        console.log('Payment proof submission response:', res);
        this.router.navigate(['/user/dashboard']);
      },
      error: (err) => {
        this.snackbarService.show('Failed to submit payment proof', 'error', 3000, err);
        console.log('Payment proof submission error:', err);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
