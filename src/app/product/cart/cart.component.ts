import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/product/cart';
import { Category } from 'src/app/model/product/category';
import { Product } from 'src/app/model/product/product';
import { CartService } from 'src/app/service/sale-service/cart.service';
import { SaleproductService } from 'src/app/service/sale-service/saleproduct.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Cart[] = [];
  productList: Product[] = []
  cates: Category[] = []
  users: any
  carts: any

  constructor(
    private cartService: CartService,
    private prService: SaleproductService,
    private active: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.active.paramMap.subscribe(data => {
      this.users = data.get('id')
    })

    this.prService.getAll().subscribe(data => {
      this.productList = data;
    })

    this.prService.getAllCate().subscribe(data => {
      this.cates = data;
    })

    this.cartService.getAll().subscribe(data => {
      this.cartList = data
    })
  }


  delete(item) {
    this.carts = item
    this.cartService.DeleteCart(this.carts.id).subscribe(data => {
      this.ngOnInit()
    })
  }

  decreaseNumberOrders(item: Cart) {
    if (item.numberOrders > 1) {
      item.numberOrders -= 1;
      this.carts = item
      this.cartService.updateCart(this.carts.id, this.carts).subscribe(data => {
        this.ngOnInit();
      })
    }

  }

  increaseNumberOrders(item: Cart) {
    item.numberOrders += 1;
    this.carts = item
    this.cartService.updateCart(this.carts.id, this.carts).subscribe(data => {
      this.ngOnInit();
    })
  }

  QuantityOrder() {
    let totalQuantity = 0;
    for (let item of this.cartList) {
      if (this.users === item.userId) {
        totalQuantity = totalQuantity + 1;
      }
    }
    return totalQuantity;
  }

  calculateTotal() {
    let total = 0;
    for(let i of this.cartList){
      if(this.users === i.userId){
        for(let p of this.productList){
          const prdIdCart = i.productId
          const prdIdProduct = p.id
          if(prdIdCart == prdIdProduct){
            total+= p.cost *i.numberOrders
          }
        }
      }
    }
    return total;
  }

  ToPayment() {
    if (this.calculateTotal() == 0) {
      // this.toast.error('Bạn chưa có đơn hàng nào cần thanh toán')
    } else {
      this.router.navigate(['/payment', this.users], {
      });
    }
  }
}
