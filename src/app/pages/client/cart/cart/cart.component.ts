import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: any = JSON.parse(localStorage.getItem("cart") as string);

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  handleRemoveCart(id: string) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa SP khỏi giỏ hàng?',
      text: "Bạn không thể hoàn tác sau khi xóa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeItem(id, () => {

          Swal.fire(
            'Thành công!',
            'SP đã bị xóa.',
            'success'
          )

          this.cartList = this.cartList.filter((item: any) => item.id !== id);
        });
      }
    })
    
  }

}
