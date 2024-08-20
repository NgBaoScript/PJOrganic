import { SaleproductService } from './../../service/sale-service/saleproduct.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/product/category';
import { Product } from 'src/app/model/product/product';
import { CartService } from 'src/app/service/sale-service/cart.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  productList: Product[] = []
  cates: Category[] = []
  categoryCount: { [key: string]: number } = {};
  users: any
  cateId: any


  constructor(
    private prService: SaleproductService,
    private active: ActivatedRoute,
    private cartService: CartService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe(data => {
      this.users = data.get('id')
    })

    this.active.paramMap.subscribe(data => {
      this.cateId = data.get('idd')
    })

    this.prService.getAll().subscribe(data => {
      this.productList = data;
    })

    this.prService.getAllCate().subscribe(data => {
      this.cates = data;
    })

    this.prService.getAllCate().subscribe(categories => {
      this.cates = categories;
      this.prService.getAll().subscribe(products => {
        this.productList = products;
        this.countProductsPerCategory();
      });
    });
  }

  countProductsPerCategory(): void {
    this.cates.forEach(category => {
      this.categoryCount[category.name] = this.productList.filter(product => product.category === category.id.toString()).length;
    });
  }

  Quantity(){
    let count = 0;
    for (let p of this.productList){
      if (p.category === this.cateId){
        count++;
      }
    }
    return count
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
