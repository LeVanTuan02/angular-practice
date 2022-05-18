import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {

  scrollTop!: number

  constructor() { }

  ngOnInit(): void {
    window.onscroll = () => this.scrollTop = window.scrollY;
  }

}
