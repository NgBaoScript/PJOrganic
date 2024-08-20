import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/model/product/cart';
import { HistoryPayment } from 'src/app/model/product/history';
import { InfoPayment } from 'src/app/model/product/infopayment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = "http://localhost:3000/cart";
  private apiurl = 'http://localhost:3000/user';
  private urlPayment = 'http://localhost:3000/infopayment';
  private urlHis = 'http://localhost:3000/history';


  carts: Cart[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  addCart(cart): Observable<Cart>{
    return this.httpClient.post<Cart>(this.url, cart)
  }

  getAll(): Observable<Cart[]>{
    return this.httpClient.get<Cart[]>(this.url)
  }

  DeleteCart(id): Observable<Cart> {
    return this.httpClient.delete<Cart>(this.url + '/' + id);
  }

  updateCart(id: any, cart: any) {
    return this.httpClient.put(this.url + '/' + id, cart);
  }

  updateuser(id: any, inputdata: any) {
    return this.httpClient.put(this.apiurl + '/' + id, inputdata);
  }

  addInfo(info): Observable<InfoPayment> {
    return this.httpClient.post<InfoPayment>(this.urlPayment, info)
  }

  AddOrders(his): Observable<HistoryPayment> {
    return this.httpClient.post<HistoryPayment>(this.urlHis, his)
  }

  GetIdRole(id) {
    return this.httpClient.get(this.apiurl + '/' + id);
  }
}
