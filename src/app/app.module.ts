import { MaterialModule } from './modules/material/material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductComponent } from './pages/admin/products/list-product/list-product.component';
import { ListCategoryComponent } from './pages/admin/category/list-category/list-category.component';
import { AddCategoryComponent } from './pages/admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './pages/admin/category/edit-category/edit-category.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddProductComponent } from './pages/admin/products/add-product/add-product.component';
import { EditProductComponent } from './pages/admin/products/edit-product/edit-product.component';
import { FormatCurrencyPipe } from './helper/pipe/format-currency.pipe';
import { ClientLayoutComponent } from './pages/layouts/client/client-layout/client-layout.component';
import { HomeComponent } from './pages/client/home/home.component';
import { HeaderClientComponent } from './pages/layouts/client/header-client/header-client.component';
import { FooterClientComponent } from './pages/layouts/client/footer-client/footer-client.component';
import { ClientHeaderNavComponent } from './pages/layouts/client/client-header-nav/client-header-nav.component';
import { ClientBannerComponent } from './components/client/client-banner/client-banner.component';
import { ClientCategoryComponent } from './components/client/client-category/client-category.component';
import { ClientWhyComponent } from './components/client/client-why/client-why.component';
import { ClientHomeProductsComponent } from './components/client/client-home-products/client-home-products.component';
import { ClientHomeNewsComponent } from './components/client/client-home-news/client-home-news.component';
import { ClientHomeFeedbackComponent } from './components/client/client-home-feedback/client-home-feedback.component';
import { AdminLayoutComponent } from './pages/layouts/admin/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './pages/layouts/admin/admin-header/admin-header.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { SignupComponent } from './pages/client/auth/signup/signup.component';
import { SigninComponent } from './pages/client/auth/signin/signin.component';
import { AboutComponent } from './pages/client/about/about.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductDetailComponent } from './pages/client/product-detail/product-detail.component';
import { CartComponent } from './pages/client/cart/cart/cart.component';
import { CheckOutComponent } from './pages/client/cart/check-out/check-out.component';
import { FinishComponent } from './pages/client/cart/finish/finish.component';
import { ClientCartNavComponent } from './components/client/client-cart-nav/client-cart-nav.component';
import { OrderListComponent } from './pages/admin/order/order-list/order-list.component';
import { OrderDetailComponent } from './pages/admin/order/order-detail/order-detail.component';
import { FormatDatePipe } from './helper/pipe/format-date.pipe';
import { ClientProductsComponent } from './pages/client/client-products/client-products.component';
import { ClientListProductComponent } from './components/client/client-list-product/client-list-product.component';
import { AdminToppingListComponent } from './pages/admin/topping/admin-topping-list/admin-topping-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductComponent,
    AddProductComponent,
    ListCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    EditProductComponent,
    FormatCurrencyPipe,
    ClientLayoutComponent,
    HomeComponent,
    HeaderClientComponent,
    FooterClientComponent,
    ClientHeaderNavComponent,
    ClientBannerComponent,
    ClientCategoryComponent,
    ClientWhyComponent,
    ClientHomeProductsComponent,
    ClientHomeNewsComponent,
    ClientHomeFeedbackComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    SignupComponent,
    SigninComponent,
    AboutComponent,
    ProductDetailComponent,
    CartComponent,
    CheckOutComponent,
    FinishComponent,
    ClientCartNavComponent,
    OrderListComponent,
    OrderDetailComponent,
    FormatDatePipe,
    ClientProductsComponent,
    ClientListProductComponent,
    AdminToppingListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    SlickCarouselModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
