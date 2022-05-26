import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-client-list-product',
  templateUrl: './client-list-product.component.html',
  styleUrls: ['./client-list-product.component.css']
})
export class ClientListProductComponent implements OnInit {

  products: ProductType[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll().subscribe(response => this.products = response);
  }

}
