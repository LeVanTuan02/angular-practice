import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  formUpdateCate!: FormGroup

  id!: string

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.onGetCate()
  }

  handleUpdate() {
    if (!this.formUpdateCate.invalid) {
      this.categoryService
        .updateCategory({ id: this.id, ...this.formUpdateCate.value })
        .subscribe(() => {
          this.toast.success("Cập nhật thành công")
          this.router.navigate(['/admin/category'])
        })
    } else {
      console.log(this.formUpdateCate)
    }
  }

  onGetCate() {
    this.categoryService.getCategory(this.id).subscribe(response => {
      this.formUpdateCate = new FormGroup({
        name: new FormControl(response.name, [Validators.required, Validators.minLength(3)])
      })
    })
  }

}
