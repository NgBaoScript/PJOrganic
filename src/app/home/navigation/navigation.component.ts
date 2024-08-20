import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/product/cart';
import { Category } from 'src/app/model/product/category';
import { Product } from 'src/app/model/product/product';
import { CartService } from 'src/app/service/sale-service/cart.service';
import { SaleproductService } from 'src/app/service/sale-service/saleproduct.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isadmin = false;
  isMenuVisible = false;
  users: any;
  cartList: Cart[] = []
  productList: Product[] = [];
  cates: Category[] = []


  constructor(
    private renderer: Renderer2,
    private route: Router,
    private active: ActivatedRoute,
    private cartService: CartService,
    private productService: SaleproductService,
  ) {
    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isadmin = true;
    }
  }

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/index2.js';
    this.renderer.appendChild(document.body, script);

    this.active.params.subscribe(params => {
      this.users = params['id'];
    })

    this.cartService.getAll().subscribe(data => {
      this.cartList = data
    })

    this.productService.getAll().subscribe(dt=>{
      this.productList = dt
      console.log(dt)
    })

    this.productService.getAllCate().subscribe(dt=>{
      this.cates = dt
    })

  }

  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role = sessionStorage.getItem('role');
    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }

    if (role == 'admin') {
      this.isadmin = true;
    } else {
      this.isadmin = false;
    }
  }

  total() {
    let total = 0;
    for (let item of this.cartList) {
      if (item.userId === this.users) {
        for (let p of this.productList) {
          if (item.productId == p.id) {
            total += p.cost * item.numberOrders;
          }
        }
      }
    }
    return total;
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

}
