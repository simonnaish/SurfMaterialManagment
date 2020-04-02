import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { map } from 'rxjs/operators';
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


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  amount: number = 0;
  onAmountChange(materialType: string, model: string, size: string, newAmount: number) {
    let temporaryName: string = '';
    let temporaryAmount: number = 0;
    this.equipment[0][materialType].forEach(item => {
      if (item.Model == model) {
        temporaryName += model + ' ' + size;

        if (item.amount[size] == newAmount) {
          this.temporaryChanges.delete(temporaryName);
          // this.temporaryChanges[temporaryName].pop();
        }
        else {
          temporaryAmount = newAmount - item.amount[size];
          this.temporaryChanges.set(temporaryName, temporaryAmount);//={temporaryName:temporaryAmount}//;

        }
      }
    });


  }


  //set color of <p> depend to value
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

  addMaterial() {
    if (this.temporaryChanges.size == 0) {
      alert("You did not make any changes.");
      return;
    }
    console.log(this.temporaryChanges.length);
    console.log(this.temporaryChanges.size);
    let temporaryString: string = '';
    for (let item in this.temporaryChanges) {
      temporaryString += item + ' changed by: ' + this.temporaryChanges[item] + '\n';
    }

    this.openDialog(this.temporaryChanges);

    this.temporaryChanges = new Map();
  }

  openDialog(listOfChanges: {}): void {
    console.log(listOfChanges);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: listOfChanges

    });

  }
}

