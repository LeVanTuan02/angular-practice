import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(files: FileList) {
    const formData = new FormData()
    formData.append("upload_preset", "u6e4fyfm")
    formData.append("file", files[0])

    return this.http.post<any>("https://api.cloudinary.com/v1_1/levantuan/image/upload", formData);
  }
}
