import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/product/category';
import { Product } from 'src/app/model/product/product';
import { CartService } from 'src/app/service/sale-service/cart.service';
import { SaleproductService } from 'src/app/service/sale-service/saleproduct.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {
  products: Product[] = []
  cates: Category[] = []
  users: any


  constructor(
    private prdService: SaleproductService,
    private cartService: CartService,
    private router: Router,
    private active: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe(data => {
      this.users = data.get('id')
    })

    this.prdService.getAll().subscribe(data => {
      this.products = data;
    })

    this.prdService.getAllCate().subscribe(data => {
      this.cates = data;
    })
  }

  addToCart(prd) {
    const cartItem = {
      productId: prd,
      userId: this.users,
      numberOrders: 1
    }
    this.cartService.addCart(cartItem).subscribe(cart => {
      console.log(cart)
      this.router.navigate(['cart', this.users]);
    })
  }

}
