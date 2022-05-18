import { Component, OnInit } from '@angular/core';
import { CategoryType } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  categoryList: CategoryType[] = [];

  constructor(
    private cateService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.cateService.getAllCategory().subscribe(response => this.categoryList = response)
  }

  handleRemove(id?: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa không?',
      text: "Bạn không thể hoàn tác sau khi xóa",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.cateService.removeCategory(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

          this.categoryList = this.categoryList.filter(item => item.id !== id);
        })
      }
    })
  }

}
