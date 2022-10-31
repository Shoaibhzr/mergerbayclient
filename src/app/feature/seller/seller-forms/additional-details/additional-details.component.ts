import { FormTypeEnum } from './../../../../shared/enums/form-type';
import { Component, HostListener, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormGroup } from '@angular/forms';
import { Sectorervice } from 'src/app/shared/services/sectors/sectors.services';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';
import { SetupService } from 'src/app/shared/services/common/setups.service';
import { SellerService } from 'src/app/shared/services/seller/seller.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.css']
})
export class AdditionalDetailsComponent implements OnInit {

  //#region UI properties
  value: number = 15;
  highValue: number = 1000;
  options: Options = {
    floor: 25,
    ceil: this.highValue,
    translate: (value: number): string => {
      return 'AED ' + value + ' Million';
    },
  };
  fixed_value: number = 35;
  fixed_highValue: number = 100;
  fixed_options: Options = {
    floor: 0,
    ceil: this.fixed_highValue,
    translate: (value: number): string => {
      return 'AED ' + value + ' Million';
    },
  };
  inventory_value: number = 55;
  inventory_highValue: number = 100;
  inventory_options: Options = {
    floor: 0,
    ceil: this.inventory_highValue,
    translate: (value: number): string => {
      return 'AED ' + value + ' Million';
    },
  };
  formTabSelected: boolean = true;
  bo_country = '';
  bo_inst_country = '';
  c_bo_country(event: any, selector: string) {
    if (event != '' && typeof event != 'undefined') {
      //event = event.toLowerCase();
      let code = this.countries_list
        .find((x) => x.country_Id == event)
        ?.code?.toLowerCase();
      this.bo_country = `flag_holder flag flag-${code}`;
    } else {
      this.bo_country = '';
    }
  }
  showMendate = false;
  load_Mendate(event: any) {
    let selectedrole = this.transaction_roles.find((x) => x.role_Id == event)?.name;
    if (selectedrole == 'Direct Party') {
      this.showMendate = false;
    } else {
      this.showMendate = true;
    }
  }
  //#endregion
  @HostListener('window:beforeunload', ['$event'])
  doSomething($event: any) {
    $event.returnValue = true;
    //console.log($event);
  }

  additonalForm: FormGroup;
  sellOut_Id: any;
  //#region Setups List Properies
  countries_list: any[];
  year_establishments: any[];
  transaction_roles: any[];
  properties_list: any[];
  contractDurations_list: any[];
  //#endregion
  //#region constructor and life cycle hooks
  constructor(
    private sector: Sectorervice,
    private formService: FormService,
    private _setupService: SetupService,
    private _sellerService: SellerService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    //this.getSectors();
    setTimeout(() => {
      this.InitializeData();
    });
    document.body.classList.add('theme_2');
  }
  //#endregion

  ngOnDestroy(): void {
    document.body.classList.remove('theme_2');
  }

  //#region  DropDowns InitializeData
  private InitializeData() {
    this.GetContriesList();
    this.GetEstablishmentList();
    this.GetTransactionRolesList();
    this.GetPropertiesList();
    this.GetContractDurationsList();
  }
  GetContriesList() {
    this._setupService.getCoutries().subscribe((res) => {
      this.countries_list = res as any[];
    });
  }
  GetEstablishmentList() {
    this._setupService.getYearEstablishMents().subscribe((res) => {
      this.year_establishments = res as any[];
    });
  }
  GetTransactionRolesList() {
    this._setupService.getTransactionRoles().subscribe((res) => {
      this.transaction_roles = res as any[];
    });
  }
  GetPropertiesList() {
    this._setupService.getProperties().subscribe((res) => {
      this.properties_list = res as any[];
    });
  }
  GetContractDurationsList() {
    this._setupService.getContractDurations().subscribe((res) => {
      this.contractDurations_list = res as any[];
    });
  }
  //#endregion

}
