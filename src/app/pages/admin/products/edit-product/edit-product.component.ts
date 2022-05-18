import { UploadFileService } from 'src/app/services/upload-file.service';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryType } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import slugify from 'slugify';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  formUpdateProduct!: FormGroup
  categories!: CategoryType[]
  preview!: string | ArrayBuffer | null
  image!: FileList
  id!: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private uploadFile: UploadFileService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.onGetProduct();

    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategory().subscribe(response => this.categories = response);
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
          image: new FormControl(""),
          preview: new FormControl(response.image),
          status: new FormControl(response.status, Validators.required)
        })
      })
  }

  async handleUpdateProduct() {
    if (this.formUpdateProduct.valid) {

      let newImage;
      if (this.image && this.image.length) {
        const uploadResult = await this.uploadFile.uploadImage(this.image).toPromise();
        newImage = uploadResult.url;
      }

      const { preview, image, ...productData } = this.formUpdateProduct.value;
      const slug = slugify(productData.name, { lower: true, locale: 'vi' });

      this.productService.updateProduct({
        id: this.id,
        ...productData,
        categoryId: +productData.categoryId,
        status: +productData.status,
        image: newImage || preview,
        slug
      }).subscribe(() => {
        this.toast.success("Cập nhật SP thành công");
        this.router.navigate(['/admin/products'])
      })
    } else {
      console.log("invalid");
      
    }
  }

  changeImage(event: Event) {
    this.image = (event.target as HTMLInputElement).files as FileList;
    
    const file = this.image[0];

    const reader = new FileReader();

    reader.onload = () => this.preview = reader.result;
    reader.readAsDataURL(file); 
  }

}
