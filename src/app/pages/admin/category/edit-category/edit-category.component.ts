import { environment } from './../../../../../environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import slugify from 'slugify';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  @ViewChild('formUpdateCate') formUpdateCate!: NgForm
  preview: any = environment.defaultImage
  image!: FileList
  @ViewChild("slug") slug!: ElementRef

  id!: string

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService,
    private router: Router,
    private categoryService: CategoryService,
    private upload: UploadFileService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.onGetCate()
  }

  async handleUpdate() {
    if (!this.formUpdateCate.invalid) {
      
      const { image: oldImage, ...formData } = this.formUpdateCate.value;

      if (this.image && this.image.length) {
        const uploadResult = await this.upload.uploadImage(this.image).toPromise()
        formData.image = uploadResult.url;
      }

      this.categoryService
        .updateCategory({ id: this.id, ...formData })
        .subscribe(() => {
          this.toast.success("Cập nhật thành công")
          this.router.navigate(['/admin/categories'])
        })
    } else {
      console.log(this.formUpdateCate)
    }
  }

  onGetCate() {
    this.categoryService.getCategory(this.id).subscribe(response => {
      this.preview = response.image

      this.formUpdateCate.setValue({
        name: response.name,
        slug: response.slug,
        image: null
      })
    })
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

}
