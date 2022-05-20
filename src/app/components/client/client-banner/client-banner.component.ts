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

}
