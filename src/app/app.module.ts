import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './home/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { FooterComponent } from './home/footer/footer.component';
import { SlideComponent } from './home/slide/slide.component';

import { InfoAcountComponent } from './admin/info-acount/info-acount.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ResumeComponent } from './admin/resume/resume.component';
import {NgxPaginationModule} from "ngx-pagination";
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { InfoComponent } from './home/info/info.component';
import { ProductsComponent } from './product/products/products.component';
import { NewsComponent } from './home/news/news.component';
import { CartComponent } from './product/cart/cart.component';
import { PayComponent } from './product/pay/pay.component';
import { ListComponent } from './product/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SlideComponent,
    CarouselComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    InfoAcountComponent,
    ResumeComponent,
    EditProductComponent,
    InfoComponent,
    ProductsComponent,
    NewsComponent,
    CartComponent,
    PayComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
