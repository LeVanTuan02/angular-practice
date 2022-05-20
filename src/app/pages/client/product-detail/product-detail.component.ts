import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductType } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { v4 as uuidV4, v4 } from "uuid";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  formAddcart!: FormGroup

  slug!: string
  id?: string
  productDetail!: ProductType

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.formAddcart = new FormGroup({
      quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")])
    })

    this.slug = this.route.snapshot.params['slug'];

    this.productService.getBySlug(this.slug).subscribe(([response]) => {
      this.id = response.id
      this.productDetail = response;
    })
  }

  handleAddCart() {
    if (this.formAddcart.valid) {
      // console.log(this.formAddcart.value, this.id)
      const { id, ...rest } = this.productDetail
      this.cartService.addCart({
        id: uuidV4(),
        ...rest,
        productId: id,
        ...this.formAddcart.value
      })

      this.toastr.success(`Thêm ${this.productDetail.name} vào giỏ hàng thành công!`);

      this.formAddcart.setValue({
        quantity: 1
      })
    } else {
      console.log("Invalid")
    }
  }

  onIncrease() {
    this.formAddcart.setValue({
      quantity: this.formAddcart.get('quantity')?.value + 1
    })
  }

  onDecrease() {
    this.formAddcart.setValue({
      quantity: this.formAddcart.get('quantity')?.value <= 1 ? 1 : this.formAddcart.get('quantity')?.value - 1
    })
  }

}
