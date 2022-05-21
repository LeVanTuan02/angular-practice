import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderDetailType } from '../models/orderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  API = `${environment.apiUrl}/orderDetails`;

  constructor(private http: HttpClient) { }

  add(orderDetail: OrderDetailType): Observable<OrderDetailType> {
    return this.http.post<OrderDetailType>(this.API, orderDetail);
  }

  getWhereOrder(orderId: number): Observable<OrderDetailType[]> {
    const url = `${this.API}/?orderId=${orderId}&_expand=order&_expand=product`;
    return this.http.get<OrderDetailType[]>(url);
  }
}
