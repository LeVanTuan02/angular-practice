import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  formCheckout!: FormGroup

  userLogged: any = JSON.parse(localStorage.getItem("auth") as string) || undefined;
  cartList: any = JSON.parse(localStorage.getItem("cart") as string);
  totalPrice!: number

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router,
    private orderdetailService: OrderDetailService
  ) { }

  ngOnInit(): void {
    this.formCheckout = new FormGroup({
      name: new FormControl(this.userLogged && this.userLogged.name),
      phone: new FormControl('', Validators.required),
      email: new FormControl(this.userLogged && this.userLogged.email, [Validators.required, Validators.email]),
      address: new FormControl(this.userLogged && this.userLogged.address, Validators.required),
      message: new FormControl('')
    })

    this.totalPrice = this.cartService.handleTotalPrice();
  }

  async handleCheckout() {
    if (this.formCheckout.valid) {
      const { name, email, phone, message, address } = this.formCheckout.value;

      this.orderService.addOrder({
        userId: this.userLogged ? this.userLogged.id : 0,
        customerName: name,
        address,
        phone,
        email,
        totalPrice: this.totalPrice,
        message,
        status: 0,
        createdAt: new Date().toISOString()
      }).subscribe(async ({ id }: any) => {
        this.toastr.success("Đặt hàng thành công");
        
        for await (let cart of this.cartList) {
          this.orderdetailService.add({
            orderId: id,
            productId: cart.productId,
            productPrice: cart.price,
            quantity: cart.quantity,
          }).toPromise()
        }

        this.cartService.finishOrder();
        this.router.navigate(['/cart/thank-you']);
      })
    } else {
      console.log("Invalid");
    }
  }

}
