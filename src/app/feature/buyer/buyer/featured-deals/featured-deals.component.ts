import { Component, OnInit } from '@angular/core';
import { FormTypeEnum } from 'src/app/shared/enums/form-type';
import { SearchParams } from 'src/app/shared/models/SearchParams';
import { SP_BUYOUTS } from 'src/app/shared/models/SP_BUYOUTS';
import { SellerService } from 'src/app/shared/services/seller/seller.service';
import { UserAuthService } from 'src/app/shared/services/user/user.auth';


@Component({
  selector: 'app-buy-featured-deals',
  templateUrl: './featured-deals.component.html',
  styleUrls: ['./featured-deals.component.css']
})
export class BuyFeaturedDealsComponent implements OnInit {

  formTypeCommercial = FormTypeEnum.CommercialProperty;
  docsFormData:FormData;
  blobDocsAddress:string='https://mergerbayblob.blob.core.windows.net/dealroom/';
  profileDealDocs:string='';
  slides:SP_BUYOUTS[] = [];
  slideConfig = {
    centerMode: true,
    centerPadding: '120px',
    slidesToShow: 3,
    prevArrow: '<button class="slide-arrow prev-arrow"><img src="../../../../assets/images/prev-arrow.png" class="img-fluid" alt="Prev Arrow" ></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><img src="../../../../assets/images/next-arrow.png" class="img-fluid" alt="Next Arrow" ></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '30px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(private _sellerService:SellerService,private userAuth:UserAuthService,) {

    this.docsFormData=new FormData();
   }

  ngOnInit(): void {
    this.loadFeaturedData();
  }

  loadFeaturedData(){
    let params:SearchParams = {
      isPublic: true,
      isFeatured:true,
    }
    this._sellerService.readFeaturedBuyOuts(params).subscribe(res => {
      this.slides =  res;
    })
  }

  dealDocs(event: any):void{
    //this.docsFormData.delete;
    this.docsFormData.append('profile',event.target.files[0]);
    this.userAuth
    .uploadDealDocs(this.docsFormData)
    .subscribe(
      (data:any) => {
       console.log(data);
       this.profileDealDocs=this.blobDocsAddress+data['fileName'];
      },
      (error) => {
      }
    );  
  }
}
