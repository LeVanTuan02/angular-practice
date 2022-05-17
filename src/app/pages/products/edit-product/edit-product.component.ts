import { UploadFileService } from 'src/app/services/upload-file.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoryType } from './../../../models/category';
import { ProductType } from 'src/app/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  formUpdateProduct!: FormGroup
  listCategory!: CategoryType[]
  preview!: any
  image!: FileList
  id!: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private productService: ProductService,
    private uploadFile: UploadFileService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.onGetProduct();

    this.getCategories();
  }

  getCategories() {
    this.http
      .get<CategoryType[]>("http://localhost:3003/categories")
      .subscribe(response => {
        this.listCategory = response
      })
  }

  onGetProduct() {
    this.productService.getProduct(this.id)
      .subscribe(response => {
        this.preview = response.image;

        this.formUpdateProduct = new FormGroup({
          name: new FormControl(response.name, [Validators.required, Validators.minLength(3)]),
          price: new FormControl(response.price, Validators.required),
          categoryId: new FormControl(response.categoryId, Validators.required),
          description: new FormControl(response.description),
          image: new FormControl(response.image)
        })
      })
  }

  async handleUpdateProduct() {
    if (this.formUpdateProduct.valid) {
      let newImage = "";
      if (this.image && this.image.length) {
        const fileUpload = await this.uploadFile.uploadImage(this.image).toPromise();
        newImage = fileUpload.url;
      }

      this.productService
      .updateProduct({
        ...this.formUpdateProduct.value,
        image: newImage || this.formUpdateProduct.value.image,
        id: this.id
      })
      .subscribe(() => {
        this.toast.success("Cập nhật SP thành công");
        this.router.navigate(['/admin/product']);
      })

    } else {
      console.log("invalid");
      
    }
  }

  handleChangeImage(event: Event) {
    this.image = (event.target as HTMLInputElement).files as FileList;

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
