import {Component, OnInit, Output} from '@angular/core';
import {Sale, User} from '../../../model/models';
import {SalesService} from '../../../services/sales.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/authentication/user.service';
import {Observable} from 'rxjs';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../../services/authentication/token-storage.service';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.scss']
})
export class CreateSaleComponent implements OnInit {
  public sale: Sale = new Sale();
  public frmGrp: FormGroup = new FormGroup({
    productNameCtrl : new FormControl(),
    productProfitCtrl : new FormControl(),
    dateCtrl : new FormControl(),
  });
  public closedAlert = true;
  public isUpdate = false;
  public user: User;
  constructor(
              private salesService: SalesService,
              private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService,
              private userService: UserService) {

    if (this.salesService.saleToEdit) {
      this.sale = this.salesService.saleToEdit;
      this.salesService.saleToEdit = null;
      this.isUpdate = true;
    }
  }

  public ngOnInit(): void {
    this.createForm();
    this.initUserData();
  }
  public initUserData(): void {
    if (this.userService.isLoggedIn) {
      this.userService.getUserByName(this.tokenStorage.getUsername()).subscribe( (data: User) => {
        this.user = data;
      });
    }
  }
  public createForm(): void {
    this.frmGrp = this.formBuilder.group({
      productNameCtrl: [this.sale.productName || '', Validators.required],
      productProfitCtrl: [this.sale.productProfit || '', Validators.required],
      dateCtrl: [this.sale.date || '', Validators.required]
    });
  }
  public checkAllControls(): boolean {
    let frmgrp = this.frmGrp;
/*    let productNameCtrl = frmgrp.controls['productNameCtrl'];
    let productProfitCtrl = frmgrp.controls['productProfitCtrl'];
    let dateCtrl = frmgrp.controls['dateCtrl'];*/
    Object.keys(frmgrp.controls).forEach((control: string) => {
      const typedControl: AbstractControl = frmgrp.controls[control];
      if (typedControl.invalid && (typedControl.pristine || typedControl.invalid)) {
        return true;
      }
    });
    return false;

  }

  public onSubmit(): void {

    let productNameCtrl = this.frmGrp.controls['productNameCtrl'].value;
    let productProfitCtrl = this.frmGrp.controls['productProfitCtrl'].value;
    let dateCtrl = this.frmGrp.controls['dateCtrl'].value;

    this.sale.productName = productNameCtrl;
    this.sale.productProfit = productProfitCtrl;
    this.sale.date = dateCtrl;
    this.sale.user = this.user;

        let saleObservable: Observable<Object> =
      this.isUpdate ?
        this.salesService.updateSale(this.sale)
        :
        this.salesService.createSale(this.sale);

    saleObservable.subscribe( (event: HttpEvent<{}>) => {
      console.log( event);
      this.closedAlert = true;

    }, error => {
      console.log(error);
      this.closedAlert = false;
    });
  }


}
