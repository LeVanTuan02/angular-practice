import { environment } from './../../../../../environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import slugify from 'slugify';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  
  @ViewChild("formAddCate") formAddCate!: NgForm
  @ViewChild("slug") slug!: ElementRef

  preview: any = environment.defaultImage
  image!: FileList

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private upload: UploadFileService
  ) { }

  ngOnInit(): void {
  }

  changeImage(event: Event) {
    this.image = (event.target as HTMLInputElement).files as FileList;

    if (this.image.length) {
      const file = this.image[0];

      const reader = new FileReader()

      reader.onload = () => this.preview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  changeName(event: Event) {
    const name = (event.target as HTMLInputElement).value;
    
    this.slug.nativeElement.value = slugify(name, { lower: true});
  }

  async handleAdd() {
    if (this.formAddCate.valid) {
      const imageUrl = await this.upload.uploadImage(this.image).toPromise();

      this.categoryService.addCategory({
        ...this.formAddCate.value,
        slug: this.slug.nativeElement.value,
        image: imageUrl.url
      })
      .subscribe(() => {
        this.toastr.success("Thêm danh mục thành công");
        this.router.navigate(['/admin/categories']);
      })
    }
  }
}
