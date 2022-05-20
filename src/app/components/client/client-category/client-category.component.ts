import { Component, OnInit } from '@angular/core';
import { CategoryType } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-client-category',
  templateUrl: './client-category.component.html',
  styleUrls: ['./client-category.component.css']
})
export class ClientCategoryComponent implements OnInit {

  categories!: CategoryType[]

  constructor(private categorySerivce: CategoryService) { }

  ngOnInit(): void {
    this.categorySerivce.getAllCategory(4).subscribe(response => {
      this.categories = response;
    })
  }

}
