import { Component, OnInit } from '@angular/core';
import { CRUDServiceService } from '../services/crudservice.service';
import { empty, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  sails: any;
  boards: any;
  beginners: any;
  accessories: any;

  sailsAmount: number;
  boardsAmount: number;
  beginnersBoardsAmount: number;
  beginnersSailsAmount: number;

  boomsAmount: number;
  mastsAmount: number;
  extensionsAmount: number;
  mastBaseAmount: number;
  wetsuitsAmount: number;
  harnessAmount: number;
  harnessLinesAmount: number;

  constructor(private _http: CRUDServiceService) {
    this.sails=_http.loadSails();
    this.boards = _http.loadBoards();
    this.beginners = _http.loadBeginners();
    this.accessories = _http.loadAccessories();
    // this.setAmounts();
  }

  ngOnInit(): void {
    this.setAmounts();
    

  }
  ngDoCheck():void{
    // this.setAmounts();

    }

  setAmounts() {
    this.sailsAmount = this.getSailsAmount();
    // this.boardsAmount = getBoardsAmount();
    // this.beginnersBoardsAmount = getBeginnerBoardsAmount();
    console.log(this.sailsAmount);

  }

  getSailsAmount() {
    let amount=0;
    this.sails.forEach(item=>amount+=item.length);
    //  console.log(this.sails.length);// .forEach(item => console.log(item.length));
  
    // console.log(amount);
    return amount;
  }
}
