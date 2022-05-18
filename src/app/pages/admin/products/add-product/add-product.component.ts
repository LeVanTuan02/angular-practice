import { CategoryType } from './../../../../models/category';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  formAddProduct!: FormGroup
  listCategory!: CategoryType[]
  image!: FileList
  preview: any = environment.defaultImage

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private router: Router,
    private productService: ProductService,
    private uploadService: UploadFileService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    
    this.formAddProduct = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      price: new FormControl(null, Validators.required),
      image: new FormControl("", Validators.required),
      categoryId: new FormControl("", Validators.required),
      description: new FormControl(null),
    })
  }

  getCategories() {
    this.http
      .get<CategoryType[]>("http://localhost:3003/categories")
      .subscribe(response => {
        this.listCategory = response
      })
  }

  async onSubmit() {
    if (this.formAddProduct.valid) {
      const image = await this.uploadService.uploadImage(this.image).toPromise();

      this.productService.addProduct({ ...this.formAddProduct.value, image: image.url })
      .subscribe(() => {
        this.toast.success("Thêm SP thành công");
        this.router.navigate(['/admin/product']);
      })
    } else {
      console.log("Invalid");
    }
  }

  changeImage(event: Event) {
    this.image = ((event.target as HTMLInputElement).files as FileList);
    
    if (this.image.length) {
      const file = this.image[0];

      const reader = new FileReader()

      reader.onload = () => {
        this.preview = reader.result;
      }

      reader.readAsDataURL(file);
    }
  }
    

}
