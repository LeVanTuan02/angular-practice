import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToppingType } from '../models/topping.model';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {

  API = `${environment.apiUrl}/toppings`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ToppingType[]> {
    return this.http.get<ToppingType[]>(this.API);
  }

  add(topping: ToppingType): Observable<ToppingType> {
    return this.http.post<ToppingType>(this.API, topping);
  }

  get(id?: number): Observable<ToppingType> {
    const url = `${this.API}/${id}`;
    return this.http.get<ToppingType>(url);
  }

  update(topping: ToppingType): Observable<ToppingType> {
    const url = `${this.API}/${topping.id}`;
    return this.http.put<ToppingType>(url, topping);
  }

  remove(id?: number) {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }
}
