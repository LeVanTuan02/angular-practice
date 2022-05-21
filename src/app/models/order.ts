export interface OrderType {
  id?: string,
  userId: number,
  customerName: string,
  address: string,
  phone: string,
  email: string,
  totalPrice: number,
  message: string,
  status: number,
  createdAt: string
}