import { Component, OnInit } from '@angular/core';
import { CRUDServiceService } from '../services/crudservice.service';

@Component({
  selector: 'app-beginners',
  templateUrl: './beginners.component.html',
  styleUrls: ['./beginners.component.scss']
})
export class BeginnersComponent implements OnInit {

  //Observable with list of equipment and amount
  equipment: any;

  //Temporary changes kept before save
  temporaryChanges: any = {};


  constructor(private _http: CRUDServiceService) {
  }

  ngOnInit(): void {
    this.loadEquipment();
  }

  loadEquipment() {
    let temporary: any[] = [];
    this._http.getBeginners().forEach(data => temporary.push(data)).finally; {
      this.equipment = temporary;
    };


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



  addMaterial(){
    this.temporaryChanges=[];
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


}
