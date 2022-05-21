import { Component, OnInit } from '@angular/core';
import { OrderType } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList: OrderType[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService
    .getAll()
    .subscribe(response => this.orderList = response);
  }

}
