import { Component, OnInit } from '@angular/core';
import {SalesService} from '../../../services/sales.service';

@Component({
  selector: 'app-delete-sale',
  templateUrl: './delete-sale.component.html',
  styleUrls: ['./delete-sale.component.scss']
})
export class DeleteSaleComponent implements OnInit {

  constructor(private salesService: SalesService) { }

  public ngOnInit(): void {
  }

  public deleteSale(): void {
    if (this.salesService.saleToEdit) {
    this.salesService.deleteSale(this.salesService.saleToEdit.id).subscribe(() => {}, error => console.log(error));
    }
  }

}
