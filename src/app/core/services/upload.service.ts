import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface PresignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
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
}
