import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-client-home-products',
  templateUrl: './client-home-products.component.html',
  styleUrls: ['./client-home-products.component.css']
})
export class ClientHomeProductsComponent implements OnInit {

  products!: ProductType[]

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll(0, 8).subscribe(response => {
      this.products = response;
    })
  }

}
