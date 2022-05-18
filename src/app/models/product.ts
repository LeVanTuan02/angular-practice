export interface ProductType {
  id?: string,
  name: string,
  price: number,
  categoryId: string,
  category?: {
    name: string
  },
  image: string,
  description: string,
  status: number
}