import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basic-crud',
  templateUrl: './basic-crud.component.html',
  styleUrls: ['./basic-crud.component.scss']
})
export class BasicCRUDComponent implements OnInit {

  @Input()
  equipment:any;

    //Temporary changes kept before save
    temporaryChanges: any = {};


  constructor() { }

  ngOnInit(): void {
  }


  amount: number = 0;
  onAmountChange(materialType: string, model: string, size: string, newAmount: number) {
    let temporaryName: string = '';
    let temporaryAmount: number = 0;
    this.equipment[0][materialType].forEach(item => {
      if (item.Model == model) {
        temporaryName += model + size;
        temporaryAmount = newAmount - item.amount[size];
      }
    });

    this.temporaryChanges[temporaryName] = temporaryAmount;
    // console.log(this.temporaryChanges);
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

  addMaterial(){
    this.temporaryChanges=[];
  }

}
