import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/product/cart';
import { Category } from 'src/app/model/product/category';
import { Product } from 'src/app/model/product/product';
import { CartService } from 'src/app/service/sale-service/cart.service';
import { SaleproductService } from 'src/app/service/sale-service/saleproduct.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  users: any
  information: FormGroup;
  addInfo: FormGroup;
  cartList: Cart[] = [];
  productList: Product[] = [];
  cates: Category[] = []
  today: any = Date.now();



  constructor(
    private cartService: CartService,
    private productService: SaleproductService,
    private builder: FormBuilder,
    private router: Router,
    private active: ActivatedRoute,
    private toast: ToastrService

  ) { 
    this.information = this.builder.group({
      id: [''],
      firstname: [''],
      name: [''],
      password: [''],
      email: [''],
      role: ['', Validators.required],
      isactive: []
    })
  }

  ngOnInit(): void {
    this.cartService.getAll().subscribe(dt=>{
      this.cartList = dt;
      console.log(dt)
    })

    this.productService.getAll().subscribe(dt=>{
      this.productList = dt
      console.log(dt)
    })

    this.productService.getAllCate().subscribe(dt=>{
      this.cates = dt
    })

    this.active.paramMap.subscribe(data => {
      this.users = data.get('id')
      this.cartService.GetIdRole(this.users).subscribe((res: any) => {
        this.information.patchValue({
          id: res.id,
          firstname: res.firstname,
          name: res.name,
          password: res.password,
          email: res.email,
          role: res.role,
          isactive: res.isactive,
        })
      })
    })

    this.addInfo = new FormGroup({
      userId: new FormControl(this.users, [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required]),
      datePayment: new FormControl(this.today, [Validators.required]),
      status: new FormControl('0', [Validators.required]),
    })
  }

  updateInfo() {
    this.cartService.updateuser(this.users, this.information.value).subscribe(res => {
    })
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

  addNewInfo() {
    if (this.addInfo.invalid || this.information.invalid) {
      this.toast.error('Vui lòng nhập thông tin')
    } else if (this.total() == 0) {
      this.toast.error('Bạn chưa có đơn hàng nào cần thanh toán')
    } else {
      this.cartService.addInfo(this.addInfo.value).subscribe(data => {
        for (let items of this.cartList) {
          if (items.userId == this.users) {
            const historyItem = {
              userId: items.userId,
              productId: items.productId,
              numberOrders: items.numberOrders,
              infoId: data.id,
            };
            this.cartService.AddOrders(historyItem).subscribe(data => {
            });
            this.cartService.DeleteCart(items.id).subscribe(data => {
            })
          }
        }
        this.updateInfo();
        this.router.navigate(['/home', this.users], {
        })
        this.toast.success("Đặt hàng thành công")
      });
    }
  }

}
