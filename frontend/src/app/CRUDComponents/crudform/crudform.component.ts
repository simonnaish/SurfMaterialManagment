import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';


import { Material } from 'src/app/models/material';
import { CRUDServiceService } from 'src/app/services/crudservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';
import { tap, finalize } from 'rxjs/operators';
import { tokenReference } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { PrintingComponent } from './printing/printing.component';



@Component({
  selector: 'app-crudform',
  templateUrl: './crudform.component.html',
  styleUrls: ['./crudform.component.scss'],

})


export class CRUDFormComponent implements OnInit {
  //Type of material
  @Input()
  material: Material;

  //List of avaible material in database
  @Input()
  apiUrl: string;

  //Observable with currently avaible material
  materialList$: Observable<any[]>;

  //lists of segregated material for ngStyle and dialog with list of material
  avaibleItems: any[] = [];
  repairedItems: any[] = [];
  soldItems: any[] = [];

  //single item to display in respond on client action
  @Output()
  choosenItems: any;


  //formControl from template
  items = new FormControl();

  //today date for date picked [max]
  today: any;
  //lastDate set after picking first date, set [min] for second datepicker
  lastDate: Date;


  constructor(private dialog: MatDialog, private _http: CRUDServiceService) {
  }

  ngOnInit(): void {
    this.today = new Date();
    this.loadMaterial();
  }


  //load observable and sort material for avaible/sold/repaired lists
  loadMaterial() {
    this.materialList$ = this._http.loadMaterial(this.apiUrl);
    this._http.loadMaterial(this.apiUrl).forEach(iter => iter.results.forEach(item => {
      if (item.repair == true) {
        this.repairedItems.push(item);
      }
      else if (item.sold == true) {
        this.soldItems.push(item)
      } else {
        this.avaibleItems.push(item);
      }
    }));
  }

  //check item/items and pass it to displayCrudForm
  checkItem(items: string[]) {
    var temporaryItem = [];

    items.forEach(element => {
      this._http.getItem(this.apiUrl, element).subscribe(data => temporaryItem.push(data));
    });

    this.choosenItems = temporaryItem;
  }


  //check if item is avaible in database=>send PUT request, if not=>send POST
  addItem(item: string) {
    let temporaryList = this.soldItems.concat(this.avaibleItems).concat(this.repairedItems);
    let found: boolean = false;
    temporaryList.forEach(iter => {
      if (iter.id == item) {
        this._http.recieveUsedItem(this.apiUrl, item);
        this.loadMaterial();
        found = true;
      }
    });
    if (found == false) {
      this._http.addItem(this.apiUrl, item);
      this.loadMaterial();
    }
  }

  //send PUT request. Sending material to repair
  repairItem(items: string[]) {
    items.forEach(item => this._http.repairItem(this.apiUrl, item))

    this.openSnack(items.toString() + ' sent to repair.')

    this.loadMaterial();

  }

  //send PUT request. Sending material to megastore
  sellItem(items: string[]) {
    items.forEach(item => this._http.sellItem(this.apiUrl, item));
    this.openSnack(items.toString() + ' sent to megastore.')

    this.loadMaterial();

  }

  //openDialog with all material. save to file option
  printList() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PrintingComponent, {
      data: { 'avaibleItems': this.avaibleItems, 'repairedItems': this.repairedItems, 'soldItems': this.soldItems }
    });

  }


  //Send daily report or custom report if fromDate and tillDate avaible. Else=>alert
  sendReport(reportType: string, fromDate?, tillDate?) {
    console.log('sent');
    if (reportType == 'custom') {
      if (fromDate == '') {
        this.openSnack('You must choose first date or check "Today" to send report from today.')
      } else if (tillDate == '') {
        this.openSnack('You must choose last date or check "Today" to send report from today.')
      }
      else {
        this._http.sendReport(fromDate, tillDate);
      }

    } else {
      this._http.sendReport();
    }

  }


  openSnack(message: string) { //TODO Change for SnackBar called
    alert(message);
  }


  //set [min] for second picker when first date set
  dateFilter2(d: Date) {
    this.lastDate = d;
  }


  //set ngClass(color) depend if material is in avaible/repair/sold
  getStatusClass(id: any) {
    if (id.repair == true) {
      return 'repair'
    } else if (id.sold == true) {
      return 'sold'
    }
  }



}

