import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
export interface PresignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
  key:string;
}

export interface DeleteFileResponse {
  success: boolean;
  imageUrl: string;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly api = 'https://localhost:7170/api/upload';
  constructor(private http: HttpClient) {}

  testS3(){
    return this.http.get(`${this.api}/test-s3`);
  }
  getPreSignedUrl(
    fileName: string,
    contentType: string,
  ): Observable<PresignedUrlResponse> {
    return this.http.post<PresignedUrlResponse>(
      `${this.api}/presigned-url`,
      {fileName, contentType},     
    );
  }

  uploadToS3(uploadUrl: string, fileUrl: File) {
    return this.http.put(uploadUrl, fileUrl, {
      headers: {
      'Content-Type': fileUrl.type
    }
    });
  }
  deleteFile(key:string) {
    return this.http.delete(`${this.api}/${key}`);
  }

  //  addPart(formData: FormData):Observable<ApiResponse<Part>> {
  //     return this.http.post<ApiResponse<Part>>(`${this.apiUrl}`,formData);
  //   }
  confirmImage(key:string){
    return this.http.post<DeleteFileResponse>(`${this.api}/confirm-image`,{key});
  }
}
