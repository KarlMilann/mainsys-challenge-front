import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../../services/authentication/user.service';
import {Sale, User} from '../../../model/models';
import {SalesService} from '../../../services/sales.service';
import {TokenStorageService} from '../../../services/authentication/token-storage.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CreateSaleComponent} from '../create-sale/create-sale.component';
import {DeleteSaleComponent} from '../delete-sale/delete-sale.component';
import {ErrorStateMatcher} from '@angular/material/core';
import {Observable} from 'rxjs';
export interface CustomDate {
  day: number;
  month: number;
  year: number;
}
@Component({
  selector: 'app-user-sales',
  templateUrl: './user-sales.component.html',
  styleUrls: ['./user-sales.component.scss']
})
export class UserSalesComponent implements OnInit {
  public sales: Sale[];
  public user: User;
  public closedAlert = false;
  public asyncDates: CustomDate[];
  public currentYear: any = new Date().getFullYear();
  public currentMonth: any = new Date().getMonth();
  public currentDay: any = new Date().getDay();

  public filterYearGrp: FormGroup = new FormGroup({
    'yearToStartFilterCtrl': new FormControl(0),
    'yearToEndFilter': new FormControl(Date.now()),
  });


  constructor(private userService: UserService,
              private salesService: SalesService,
              private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService,
              public dialog: MatDialog) {
    this.loadUser();

  }



  public ngOnInit(): void {
      this.createFilterForm();
  }
  private loadUser(): void {
    this.userService.getUserByName(this.tokenStorage.getUsername()).subscribe((userData: User) => {
      this.user = userData;
      this.loadSales();
    }, error => console.log(error));
  }
  public reloadbyDate(): void {
    console.log('reloading');
    this.loadSales();
  }

  private loadSales(): void {
    let yearToStartFilterCtrl: Date = this.filterYearGrp.controls['yearToStartFilterCtrl'].value;
    let yearToEndFilter: Date = this.filterYearGrp.controls['yearToEndFilter'].value;
    console.log(this.dateToNumber(yearToStartFilterCtrl));
    console.log(this.dateToNumber(yearToEndFilter));
    let startDate: number[] = this.dateToNumber(yearToStartFilterCtrl);
    let endDate: number[] = this.dateToNumber(yearToEndFilter);
    this.salesService.getSalesForUser(this.user.id).subscribe((sales: Sale[]) => {
      endDate.length === 0 ? this.sales = sales :
      this.sales = sales.filter((sale: Sale) => this.filterFordate(startDate, endDate, this.dateToNumber(sale.date))
      );
      this.orderSalesByValue(this.sales);

    }, error => console.log(error));
  }
  public dateToNumber(date: Date): number[] {
    let tabnum: number[] = [];
     date?.toString().split('-').forEach((str: string) => {
       tabnum.push(+str);
     });
     return tabnum;
  }
  public filterFordate(minValue: number[], maxValue: number[], dateTofilter: number[]): boolean {


    return dateTofilter [0] <= maxValue[0] &&
      dateTofilter[0] >= minValue[0] &&
      dateTofilter[1] <= maxValue[1] &&
      dateTofilter[1] >= minValue[1] &&
      dateTofilter[2] <= maxValue[2] &&
      dateTofilter[2] >= minValue[2];
  }
  /**
   *
   * create sale in dialog
   */
  public saleCreatorOverview(): void {
    const dialogRef = this.dialog.open(CreateSaleComponent).afterClosed().subscribe(() => {
      this.loadUser();

    });
}

  /**
   * edit sale in dialog
   * @param sale
   */
  public saleEditOverview(sale: Sale): void {
    this.salesService.saleToEdit = sale;
  const dialogRef = this.dialog.open(CreateSaleComponent).afterClosed().subscribe(() => {
    this.loadUser();

  });

}
public saleDeletion(saleToDelete: Sale): void {
    this.salesService.saleToEdit = saleToDelete;
  const dialogRef = this.dialog.open(DeleteSaleComponent).afterClosed().subscribe(() => {
    this.sales = this.sales.filter((sale: Sale) => sale.id !== this.salesService.saleToEdit.id);
    this.salesService.saleToEdit = null;
    this.loadUser();

  });
}
public orderSalesByValue(sales: Sale[]): void {
    sales.sort( (sale1: Sale, sale2: Sale) => (sale1.productProfit < sale2.productProfit ? 1 : -1));
}

public createFilterForm(): void {
    this.filterYearGrp = this.formBuilder.group({
      'yearToStartFilterCtrl': [],
      'yearToEndFilter': [],
    });
}
  public dateCompare(obs: Observable<any>): boolean {
    let yearToStartFilterCtrl = this.filterYearGrp.controls['yearToStartFilterCtrl'].value;
    let yearToEndFilter = this.filterYearGrp.controls['yearToEndFilter'].value;
    let startDate: number[] = this.dateToNumber(yearToStartFilterCtrl);
    let endDate: number[] = this.dateToNumber(yearToEndFilter);
    if (startDate[0] < 0 && (startDate[0] > endDate[0]) ||
      (startDate[0] > 0 && (startDate[0] > endDate[0]))) {
      this.closedAlert = false;
      return true;
    }
    if ((startDate[0]  === endDate[0] || (startDate[0] === null && endDate[0] === null))
      && (startDate[1] > endDate[1])) {
      this.closedAlert = false;

      return true;
    }
    if ((startDate[1] === endDate[1] || (startDate[1] === null && endDate[1] === null))
      && (startDate[2] > endDate[2])) {
      this.closedAlert = false;

      return true;
    }
    this.closedAlert = true;
    return false;
  }
  /**
   * convert inputs into date Object
   * @param year
   * @param month
   * @param day
   */

/*  public numberToDate(year: number, month: number, day: number): Date {
    let date: Date = new Date();
    if (year > 0) {
      date.setFullYear(year, month, day);
      return date;
    } else {
      date.setFullYear(-year, month, day);
      return date;
    }
  }*/
/*public filterSalesByDate(sale: Sale): boolean {
    let startDate: Date = this.filterYearGrp.controls['yearToStartFilterCtrl'].value;
    let endDate: Date = this.filterYearGrp.controls['yearToEndFilter'].value;

    if (startDate === null || !(startDate instanceof Date)) {
      startDate = new Date(0);
    }
  return (
sale.date.getTime() >= startDate.getTime() &&
  sale.date.getTime() <= endDate.getTime()
  );

}*/
  /**
   * check if start date is not before end date
   * @param obs
   */

}
