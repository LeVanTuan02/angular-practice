import { OrderDetailType } from './../../../../models/orderDetail';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId!: number
  orderDetails: OrderDetailType[] = [];
  totalPrice!: number

  constructor(
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];

    this.getOrderDetail();

    this.orderService.get(this.orderId).subscribe(response => this.totalPrice = response.totalPrice);
  }

  getOrderDetail() {
    this.orderDetailService
    .getWhereOrder(this.orderId)
    .subscribe(response => this.orderDetails = response);
  }

}
