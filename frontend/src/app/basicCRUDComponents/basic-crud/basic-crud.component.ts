import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { map, tap, finalize, toArray } from 'rxjs/operators';
import { CRUDServiceService } from 'src/app/services/crudservice.service';
import { BeginnersComponent } from 'src/app/beginners/beginners.component';
import { BasicPrintingComponent } from '../basic-printing/basic-printing.component';
import { materialLoaders } from 'src/app/reuseable/materialLoader';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-basic-crud',
  templateUrl: './basic-crud.component.html',
  styleUrls: ['./basic-crud.component.scss']
})


export class BasicCRUDComponent implements OnInit {




  @Input()
  equipment: any;

  //Temporary changes kept before save
  //tCh for current change material
  temporaryChanges: any = new Map();
  //chMap for confirmation request
  changesMap = new Map();

  //created for pritList Dialog
  materialList: {}[];

  @Input()
  apiFilterUrl: string;


  //list with amount of equipment for each item
  sizes = new Map();


  @Input()
  apiUrl: string;


  constructor(private dialog: MatDialog, private _http: CRUDServiceService, private _loader:materialLoaders) { }

  ngOnInit(): void {
    // this.setAmounts();
    this.sizes=this._loader.setAmounts(this.apiFilterUrl, this.equipment);
  }

  // //set current amount for each material to size<Map>
  // setAmounts() {
  //   for (let type in this.equipment) {
  //     for (let model in this.equipment[type]) {
  //       for (let size in this.equipment[type][model]) {
  //         this._http.loadMaterial(this.apiFilterUrl + 'type=' + type + '&model=' + model + '&size=' + this.equipment[type][model][size]).subscribe(
  //           data => {
  //             this.sizes.set(type + ' ' + model + ' ' + this.equipment[type][model][size], data.count)
  //           }
  //         )
  //       }

  //     }
  //   }
  // }


  amount: number = 0;



  //adding extra <p> with differece between current amount of material and inserted
  //creating list of changes to apply later
  onAmountChange(type: string, model: string, size: string, newAmount: number) {
    let currentAmount = this.sizes.get(type + ' ' + model + ' ' + size)
    if (currentAmount == newAmount) {
      this.temporaryChanges.delete(model + ' ' + size)
      this.changesMap.delete(type + ' ' + model + ' ' + size)

    } else {
      this.temporaryChanges.set(model + ' ' + size, newAmount - currentAmount)
      this.changesMap.set(type + ' ' + model + ' ' + size, { 'type': type, 'model': model, 'size': size, 'amount': newAmount - currentAmount })

    }

  }


  //set color of <p>(difference) depend to value
  getClass(difference: number) {
    if (difference > 0) {
      return 'positiveDifference';
    }
    else if (difference == 0) {
      return 'neutralDifference';
    }
    else {
      return 'negativeDifference';
    }
  }

  //confirm changes
  saveChanges() {
    if (this.temporaryChanges.size == 0) {
      alert("You did not make any changes.");
      return;
    }
    this.openDialog(this.temporaryChanges);
  }

  //open dialog with inserted changes to confirm
  openDialog(listOfChanges: {}): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: listOfChanges

    });
    dialogRef.afterClosed().subscribe((confirmed: Boolean) => {
      if (confirmed) {
        for (const k of this.changesMap.keys()) {
          if (this.changesMap.get(k).amount > 0) {
            this.addMaterial(this.changesMap.get(k));
          }
          else {
            this.deleteMaterial(this.changesMap.get(k));
          }
        }
      }
      this.sizes=this._loader.setAmounts(this.apiFilterUrl, this.equipment);
      this.temporaryChanges = new Map();
      this.changesMap = new Map();
    }
    )
  }

  //open dialog with material list
  printList() {
    this.openListDialog();
  }

  //opening dialog with list of all avaible material with amount  and possibility to save it to file
  openListDialog(): void {
    this.materialList = this._loader.setFullMaterialList(this.equipment, this.sizes);
    const dialogRef = this.dialog.open(BasicPrintingComponent, {
      data: { 'equipmentList': this.materialList }
    });

  }

  // //return list of maps for all avaible material, exportable to file
  // setFullMaterialList(): {}[] {
  //   let temporaryList = []
  //   for (let k in this.equipment) {
  //     for (let m in this.equipment[k]) {
  //       for (let s of this.equipment[k][m]) {
  //         let stringKey = k + ' ' + m + ' ' + s
  //         let amount = this.sizes.get(stringKey)
  //         temporaryList.push({ 'type': k, 'model': m, 'size': s, 'amount': amount })
  //       }
  //     }

  //   }
  //   return temporaryList;
  // }



  //Add material
  addMaterial(item: any) {
    for (let i = 0; item.amount > i; i++) {
      this._http.addItemWithDetails(this.apiUrl, item.type, item.model, item.size)
    }
  }

  //delete material
  deleteMaterial(item: any) {
    let idList = [];

    this._http.loadMaterial(
      this.apiUrl + '?type=' + item.type + '&model=' + item.model + '&size=' + item.size).pipe( //deleted .slice(0, -1) on type
        finalize(() => {
          let temporaryArray = idList[0].results;
          for (let i = 0; Math.abs(item.amount) > i; i++) {
            this._http.deleteItem(this.apiUrl + temporaryArray[i].id)
          }
        }
        )
      ).subscribe((data) => idList.push(data))
  }




}

