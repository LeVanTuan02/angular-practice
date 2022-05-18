import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('formAdd') formAdd?: NgForm

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  handleAdd() {
    if (this.formAdd?.valid) {
      this.categoryService.addCategory(this.formAdd.value).subscribe(() => {
        this.toastr.success("Thêm danh mục thành công");
        this.router.navigate(['/admin/category']);
      })
    }
  }
}
