import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './pages/category/list-category/list-category.component';
import { ListProductComponent } from './pages/products/list-product/list-product.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  {
    path: "admin/product", children: [
      { path: "", component: ListProductComponent },
    ]
  },
  {
    path: "admin/category", children: [
      { path: "", component: ListCategoryComponent },
      { path: "add", component: AddCategoryComponent },
      { path: ":id/edit", component: EditCategoryComponent }
    ]
  },
  {
    path: "admin/product", children: [
      { path: "", component: ListProductComponent },
      { path: "add", component: AddProductComponent },
      { path: ":id/edit", component: EditProductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
