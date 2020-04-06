import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';

import { SailsComponent } from 'src/app/sails/sails.component';

import { Material } from 'src/app/models/material';
import { Sail } from 'src/app/models/sail';
import { CRUDServiceService } from 'src/app/services/crudservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';

import { Sort } from '@angular/material/sort';



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
  materialList$: Observable<any[]>;


  //datePickeOncChange    //TODO 
  // @ViewChild("pickerInput2") view1: ElementRef;


  //single item to display in respond on client action
  @Output()
  singleItem: any;

  items = new FormControl();

  today: Date;
  lastDate: Date;


  constructor(private _http: CRUDServiceService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getUTCDate();
    this.today = new Date(currentYear, currentMonth, currentDay);


  }
  ngOnInit(): void {
    // this.dynamicSort();
  }

  checkItem(id: string[]) {

    var temporaryItem = [];
    var temporaryString: string = "";

    id.forEach(element => {
      // this.materialList$.forEach(it => it.forEach(item => { if (item.id == element) { temporaryItem.push(item) } }));
      this._http.getBoard(element).subscribe(data=>temporaryItem.push(data));

    });
    this.singleItem = temporaryItem;

  }

  //helper for sorting
  dynamicSort() {
    // return function (a, b) {
    // let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    // return result;
    // }
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


  testOnClick() {
    // console.log(this.datesForm.value);

  }

}

