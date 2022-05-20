import { Component, OnInit } from '@angular/core';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-client-banner',
  templateUrl: './client-banner.component.html',
  styleUrls: ['./client-banner.component.css']
})
export class ClientBannerComponent implements OnInit {

  sliders!: any

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
    this.sliderService.getSliders().subscribe(response => {
      this.sliders = response
    })
  }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "arrows": false};
  
  addSlide() {
    this.sliders.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.sliders.length = this.sliders.length - 1;
  }
  
  slickInit(e: any) {
    console.log('slick initialized');
  }
  
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  
  afterChange(e: any) {
    console.log('afterChange');
  }
  
  beforeChange(e: any) {
    console.log('beforeChange');
  }

}
