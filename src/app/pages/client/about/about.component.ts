import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private metaService: Meta) { }

  ngOnInit(): void {
    this.metaService.addTags([
      { name: "description", content: "Mô tả page about" },
    ])
  }

}
