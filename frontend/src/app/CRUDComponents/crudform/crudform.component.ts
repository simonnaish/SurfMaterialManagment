import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';


import { Material } from 'src/app/models/material';
import { Sail } from 'src/app/models/sail';
import { Board } from 'src/app/models/board';
import { CRUDServiceService } from 'src/app/services/crudservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';
import { tap } from 'rxjs/operators';




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

  materialList$: Observable<any[]>;
  avaibleItems: any[] = [];
  repairedItems: any[] = [];
  soldItems: any[] = [];

  //single item to display in respond on client action
  @Output()
  choosenItems: any;

  items = new FormControl();

  today: Date;
  lastDate: Date;


  constructor(private _http: CRUDServiceService) {
  }

  ngOnInit(): void {
    this.loadMaterial();
  }

  ngOnChange() {
    // this.loadMaterial();
  }

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

  checkItem(items: string[]) {
    var temporaryItem = [];

    items.forEach(element => {
      this._http.getItem(this.apiUrl, element).subscribe(data => temporaryItem.push(data));
    });

    this.choosenItems = temporaryItem;
  }

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

  repairItem(items: string[]) {
    items.forEach(item => this._http.repairItem(this.apiUrl, item))

    this.loadMaterial();

  }

  sellItem(items: string[]) {
    items.forEach(item => this._http.sellItem(this.apiUrl, item));
    this.loadMaterial();

  }

  openSnack(message: string) { //TODO Change for SnackBar called
    alert(message);
  }


  //TODO Update [min] on second date picker
  dateFilter2(d: Date) {
    console.log(this.lastDate);
    this.lastDate = d;
    console.log(this.lastDate);


  }

  getStatusClass(id: any) {
    if (id.repair == true) {
      return 'repair'
    } else if (id.sold == true) {
      return 'sold'
    }
  }


  testOnClick() {
    // console.log(this.datesForm.value);

  }

}

