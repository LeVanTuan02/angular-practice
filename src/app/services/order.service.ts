import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderType } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API_URL = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  addOrder(order: OrderType) {
    return this.http.post<OrderType>(`${environment.apiUrl}/orders`, order);
  }

  getAll(): Observable<OrderType[]> {
    return this.http.get<OrderType[]>(this.API_URL);
  }

  get(id: number) {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<OrderType>(url);
  }
}
