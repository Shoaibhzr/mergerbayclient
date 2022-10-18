import { ToastrService } from 'ngx-toastr';
import { SP_BUYOUTS } from 'src/app/shared/models/SP_BUYOUTS';
import { SellOutVm } from './../../../shared/models/SellOutVm';
import { SearchParams } from 'src/app/shared/models/SearchParams';
import { SellerService } from 'src/app/shared/services/seller/seller.service';
import { SP_SELLOUTS } from 'src/app/shared/models/SP_SELLOUTS';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-propositions',
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.css']
})
export class AdminPropositionsComponent implements OnInit {

  sellouts:SP_SELLOUTS[];
  buyouts:SP_BUYOUTS[];
  
  params:SearchParams;
  constructor(private _sellerService: SellerService,private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadSellOuts();
    this.loadBuyOuts();
    
  }

  loadSellOuts(){
    this._sellerService.readAllSellOuts(this.params).subscribe(res => {
      this.sellouts =  res as SP_SELLOUTS[];
    })
  }
  loadBuyOuts(){
    this._sellerService.readAllBuyOuts(this.params).subscribe(res => {
      this.buyouts =  res as SP_BUYOUTS[];
    })
  }
   
  saveSellers(){
    this._sellerService.updateSellersData(this.selectedSellerItems).subscribe(x => {
      this._toastr.success("Data Saved Successfully","Data Saved");
    })
  }
  selectedSellerItems:SellOutVm[] = [];
  selectedSellerRow(item:SP_SELLOUTS){
    let data:SellOutVm = {
      formId : item.sellOut_Id,
      status: item.status,
      isPublic: item.isPublic,
      isFeatured:  item.isFeatured
    }
    if(!this.selectedSellerItems.find(x => x.formId === data.formId)){
      this.selectedSellerItems.push(data);
    }else{
     let index =  this.selectedSellerItems.findIndex(x => x.formId == data.formId);
     this.selectedSellerItems[index] = data;
    }
  }
  saveBuyers(){
    this._sellerService.updateBuyersData(this.selectedBuyerItems).subscribe(x => {
      this._toastr.success("Data Saved Successfully","Data Saved");

    })
  }

  selectedBuyerItems:SellOutVm[] = [];
  selectedBuyerRow(item:SP_BUYOUTS){
    let data:SellOutVm = {
      formId : item.buyOut_Id,
      status: item.status,
      isPublic: item.isPublic,
      isFeatured:  item.isFeatured
    }
    if(!this.selectedBuyerItems.find(x => x.formId === data.formId)){
      this.selectedBuyerItems.push(data);
    }else{
     let index =  this.selectedBuyerItems.findIndex(x => x.formId == data.formId);
     this.selectedBuyerItems[index] = data;
    }
  }

  //  getDifference(array1:SP_SELLOUTS[], array2:SP_SELLOUTS[]) {
  //   return array1.filter(object1 => {
  //     return !array2.some(object2 => {
  //       return object1.sellOut_Id === object2.sellOut_Id;
  //     });
  //   });
  // }


}
