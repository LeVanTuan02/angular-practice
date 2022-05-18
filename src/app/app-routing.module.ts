import { ListCategoryComponent } from './pages/admin/category/list-category/list-category.component';
import { EditProductComponent } from './pages/admin/products/edit-product/edit-product.component';
import { ListProductComponent } from './pages/admin/products/list-product/list-product.component';
import { ClientLayoutComponent } from './pages/layouts/client/client-layout/client-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';
import { AdminLayoutComponent } from './pages/layouts/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './pages/admin/products/add-product/add-product.component';
import { AddCategoryComponent } from './pages/admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './pages/admin/category/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: "", component: ClientLayoutComponent, children: [
      { path: "", component: HomeComponent }
    ]
  },
  {
    path: "admin", component: AdminLayoutComponent, children: [
      { path: "", component: AdminDashboardComponent },
      { path: "products", component: ListProductComponent },
      { path: "product/add", component: AddProductComponent },
      { path: "product/:id/edit", component: EditProductComponent },
      { path: "categories", component: ListCategoryComponent },
      { path: "category/add", component: AddCategoryComponent },
      { path: "category/:id/edit", component: EditCategoryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
