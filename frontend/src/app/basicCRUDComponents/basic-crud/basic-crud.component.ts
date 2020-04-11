import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { map, tap, finalize, toArray } from 'rxjs/operators';
import { CRUDServiceService } from 'src/app/services/crudservice.service';
import { BeginnersComponent } from 'src/app/beginners/beginners.component';
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
  temporaryChanges: any = new Map();
  changesMap = new Map();

  @Input()
  apiFilterUrl:string;
  
  sizes = new Map();


  @Input()
  apiUrl: string;


  constructor(private dialog: MatDialog, private _http: CRUDServiceService) { }

  ngOnInit(): void {
    this.setAmounts();
  }

  setAmounts() {
    console.log('enteret setAmounts()')
    for (let type in this.equipment) {
      for (let model in this.equipment[type]) {
        for (let size in this.equipment[type][model]) {
          this._http.loadMaterial(this.apiFilterUrl +'type='+type+ '&model=' + model + '&size=' + this.equipment[type][model][size]).subscribe(
            data => {
              this.sizes.set(type+' '+model + ' ' + this.equipment[type][model][size], data.count)
            }
          )
        }
        
      }
    }
  }


  amount: number = 0;



  //adding extra <p> with differece between current amount of material and inserted
  //creating list of changes to apply later
  onAmountChange(type: string, model: string, size: string, newAmount: number) {
    let currentAmount = this.sizes.get(type+' '+model + ' ' + size)
    if (currentAmount == newAmount) {
      this.temporaryChanges.delete(model + ' ' + size)
      this.changesMap.delete(type+ ' '+model + ' ' + size)

    } else {
      this.temporaryChanges.set(model + ' ' + size, newAmount - currentAmount)
      this.changesMap.set(type+' '+model + ' ' + size, { 'type': type, 'model': model, 'size': size, 'amount': newAmount - currentAmount })

    }

    console.log(newAmount)
    console.log(this.temporaryChanges)

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
      this.setAmounts();
      this.temporaryChanges=new Map();
      this.changesMap=new Map();
    }
    )
  }


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

