import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SaleproductService } from 'src/app/service/sale-service/saleproduct.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  userId: any;


  constructor(
    private active: ActivatedRoute,
    private saleService: SaleproductService
  ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe(data => {
      this.userId = data.get('id')
    })

    // this.active.paramMap.subscribe((pa: ParamMap) => {
    //   const activeID = pa.get("id1");
    //   this.saleService.findById(activeID).subscribe(data => {
    //     this.saleProductList = data;
    //   });
    // });
  }

}
