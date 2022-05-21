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

  increaseQnt(cartId: string, next: (cart: any) => void) {
    const exitsProduct = this.cartList.find(item => item.id === cartId);

    if (exitsProduct) exitsProduct.quantity++;
    
    localStorage.setItem("cart", JSON.stringify(this.cartList))

    next(this.cartList);
  }

  decreaseQnt(cartId: string, next: (carts: any) => void) {
    const exitsProduct = this.cartList.find(item => item.id === cartId);

    if (exitsProduct) {
      if (exitsProduct.quantity <= 1) {
        this.cartList = this.cartList.filter(item => item.id !== cartId);
      } else {
        exitsProduct.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(this.cartList));

      next(this.cartList);
    }
  }

  handleTotalPrice() {
    const totalPrice = this.cartList.reduce((totalPrice: number, cart: any) => {
      return totalPrice + (cart.quantity * cart.price)
    }, 0);

    return totalPrice;
  }

  finishOrder() {
    localStorage.removeItem("cart");
  }
}
