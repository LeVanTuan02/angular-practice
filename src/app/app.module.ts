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
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
