import { ProductType } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(start = 0, limit = 0) {
    let url = `${environment.apiUrl}/products/?_expand=category`;
    if (limit) url += `&_start=${start}&_limit=${limit}`;
    return this.http.get<ProductType[]>(url);
  }

  getProduct(id: string){
    return this.http.get<ProductType>(`${environment.apiUrl}/products/${id}`);
  }

  remove(id?: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }

  addProduct(product: ProductType) {
    return this.http.post("http://localhost:3003/products", product);
  }

  updateProduct(product: ProductType) {
    return this.http.put(`${environment.apiUrl}/products/${product.id}`, product);
  }

  getBySlug(slug: string) {
    const url = `${environment.apiUrl}/products/?slug=${slug}&_expand=category`;
    return this.http.get<ProductType[]>(url);
  }
}
