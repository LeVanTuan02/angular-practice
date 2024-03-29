import { CategoryType } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategory(limit = 0) {
    let url = `${environment.apiUrl}/categories/?_sort=id&_order=desc`;
    if (limit) url += `&_limit=${limit}`;
    return this.http.get<CategoryType[]>(url);
  }

  removeCategory(id?: number) {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }

  addCategory(cate: CategoryType) {
    return this.http.post(`${environment.apiUrl}/categories`, cate);
  }

  getCategory(id: string) {
    return this.http.get<CategoryType>(`${environment.apiUrl}/categories/${id}`);
  }

  updateCategory(cate: CategoryType) {
    return this.http.patch(`${environment.apiUrl}/categories/${cate.id}`, cate);
  }
}
