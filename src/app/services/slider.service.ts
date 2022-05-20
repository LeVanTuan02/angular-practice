import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }

  getSliders() {
    return this.http.get("https://yotea-nodejs.herokuapp.com/api/slider");
  }
}
