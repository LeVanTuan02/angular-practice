import { ProductType } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  productList: ProductType[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(response => this.productList = response);
  }

  // getProducts() {
  //   this.http
  //   .get<ProductType[]>("http://localhost:3003/products/?_expand=category")
  //   .subscribe(response => {
  //     this.productList = response;
  //   })
  // }

  handleRemove(id?: string) {
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

        this.productService.remove(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );

          this.productList = this.productList.filter(item => item.id !== id);
        })
      }
    })
  }

}
