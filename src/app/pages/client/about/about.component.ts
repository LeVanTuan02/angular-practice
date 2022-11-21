import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private metaService: Meta, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("About page")

    this.metaService.addTags([
      { name: "description", content: "Mô tả page about" },
    ])
  }

}
