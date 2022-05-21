import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(user: User) {
    return this.http.post(`${environment.apiUrl}/signup`, user);
  }

  signin(user: { email: string, password: string }) {
    return this.http.post<{accessToken: string, user: any}>(`${environment.apiUrl}/signin`, user);
  }

  isAuthenticate() {
    const user = localStorage.getItem('auth');

    if (!user) return;
    return JSON.parse(user);
  }

  signout() {
    localStorage.removeItem("cart");
    localStorage.removeItem("auth");
  }
}
