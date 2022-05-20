import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList: any[] = JSON.parse(localStorage.getItem("cart") as string) || [];

  constructor() { }

  addCart(product: any) {
    const productExits = this.cartList.find(item => item.productId == product.productId);

    if (productExits) {
      productExits.quantity += product.quantity;
      console.log("Increase quantity");
    } else {
      this.cartList.push(product)
    }

    localStorage.setItem("cart", JSON.stringify(this.cartList));
  }

  removeItem(id: string, next: () => void) {
    const newCart = this.cartList.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(newCart));

    next()
  }
}
