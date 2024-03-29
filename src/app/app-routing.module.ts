import { ClientProductsComponent } from './pages/client/client-products/client-products.component';
import { OrderListComponent } from './pages/admin/order/order-list/order-list.component';
import { CheckOutComponent } from './pages/client/cart/check-out/check-out.component';
import { SignupComponent } from './pages/client/auth/signup/signup.component';
import { SigninComponent } from './pages/client/auth/signin/signin.component';
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
import { AuthGuard } from './guard/auth.guard';
import { AboutComponent } from './pages/client/about/about.component';
import { ProductDetailComponent } from './pages/client/product-detail/product-detail.component';
import { CartComponent } from './pages/client/cart/cart/cart.component';
import { FinishComponent } from './pages/client/cart/finish/finish.component';
import { OrderDetailComponent } from './pages/admin/order/order-detail/order-detail.component';
import { AdminToppingListComponent } from './pages/admin/topping/admin-topping-list/admin-topping-list.component';
import { ContestsComponent } from './pages/admin/contests/contests/contests.component';

const routes: Routes = [
  {
    path: "", component: ClientLayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: "signin", component: SigninComponent },
      { path: "signup", component: SignupComponent },
      { path: "about", component: AboutComponent },
      { path: "san-pham/:slug", component: ProductDetailComponent },
      { path: "cart", component: CartComponent },
      { path: "cart/checkout", component: CheckOutComponent },
      { path: "cart/thank-you", component: FinishComponent },
      { path: "san-pham", component: ClientProductsComponent }
    ]
  },
  {
    path: "admin", component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
      { path: "", component: AdminDashboardComponent },
      { path: "products", component: ListProductComponent },
      { path: "product/add", component: AddProductComponent },
      { path: "product/:id/edit", component: EditProductComponent },
      { path: "categories", component: ListCategoryComponent },
      { path: "category/add", component: AddCategoryComponent },
      { path: "category/:id/edit", component: EditCategoryComponent },
      { path: "orders", component: OrderListComponent },
      { path: "order/:id/detail", component: OrderDetailComponent },
      { path: "topping", component: AdminToppingListComponent },
      { path: "contests", component: ContestsComponent },
      { path: "contests/page/:page", component: ContestsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
