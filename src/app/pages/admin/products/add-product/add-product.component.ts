import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryType } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import slugify from 'slugify';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  formAddProduct!: FormGroup
  categories!: CategoryType[]
  image!: FileList

  preview: string | ArrayBuffer | null = environment.defaultImage

  constructor(
    private categoryService: CategoryService,
    private upload: UploadFileService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();

    this.formAddProduct = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      categoryId: new FormControl("", Validators.required),
      status: new FormControl("1", Validators.required),
      description: new FormControl(null),
    })
  }

  async handleAddProduct() {
    console.log(this.formAddProduct.value)
    if (this.formAddProduct.valid) {
      const imageUrl = await this.upload.uploadImage(this.image).toPromise();
      const slug = slugify(this.formAddProduct.value.name, { lower: true, locale: 'vi' });

      this.productService.addProduct({
        ...this.formAddProduct.value,
        status: +this.formAddProduct.value.status,
        categoryId: +this.formAddProduct.value.categoryId,
        image: imageUrl.url,
        slug
      }).subscribe(() => {
        this.toastr.success("Thêm sản phẩm thành công");
        this.router.navigate(['/admin/products']);
      })

    } else {
      console.log("Invalid");
    }
  }

  getCategories() {
    this.categoryService.getAllCategory().subscribe(response => this.categories = response);
  }

  changeImage(event: Event) {
    this.image = (event.target as HTMLInputElement).files as FileList;
    
    const file = this.image[0];

    const reader = new FileReader();

    reader.onload = () => this.preview = reader.result;
    reader.readAsDataURL(file); 
  }
}
