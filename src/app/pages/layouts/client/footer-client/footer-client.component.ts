import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.css']
})
export class FooterClientComponent implements OnInit {

  @Input() scrollTop!: number

  constructor() { }

  ngOnInit(): void {
  }

  backToTop() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

}
