import { ProductType } from "./product";

export interface OrderDetailType {
  orderId: string,
  productId: string,
  productPrice: number,
  quantity: number,
  product?: ProductType
}