import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/product/category';
import { Product } from 'src/app/model/product/product';

@Injectable({
  providedIn: 'root'
})
export class SaleproductService {
  products: Product[] = [];
  cates: Category[] = [];

  private url = "http://localhost:3000/product";
  private cate = "http://localhost:3000/category";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getAllCate(): Observable<Category[]>{
    return this.http.get<Category[]>(this.cate)
  }

  // findById(idSaleProduct: string | null): Observable<SaleProduct> {
  //   return this.http.get<SaleProduct>(this.url + '/' + idSaleProduct)
  // }
}
