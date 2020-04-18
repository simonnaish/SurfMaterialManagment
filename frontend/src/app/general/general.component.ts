import { Component, OnInit, Input, Output } from '@angular/core';


import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';



import { CRUDServiceService } from '../services/crudservice.service';
import { materialLoaders } from '../reuseable/materialLoader';
import { GeneralPrintingComponent } from './general-printing/general-printing.component';

import {GENERAL_URLS} from '../reuseable/constants'





@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {


  //general amount of material depend on type and category
  amounts: Map<string, number>;

  //urls to fint last movements and amount  of material
  urls: {};

  //lists with last movement(3items for each category)
  recentlyReceived: any;
  recentlyGone: any;


  //today date for date picked [max]
  today: any;
  //lastDate set after picking first date, set [min] for second datepicker
  lastDate: Date;


  //checkboxes to list
  listSails = true
  availableSails = true
  repairedSails = true
  soldSails = false


  listBoards = true
  availableBoards = true
  repairedBoards = true
  soldBoards = false

  listBeginners = true
  // availableBeginners = true
  // soldBeginners = false

  listAccessories = true
  // availableAccessories = true
  // soldAccessories = false

  //checkboxes for report
  reportSails = true
  reportBoards = true
  reportBeginners = true
  reportAccessories = true



  constructor(private _http: CRUDServiceService, private _loader: materialLoaders, private dialog: MatDialog) {


  }

  ngOnInit(): void {
    this.today = new Date();

    this.amounts = new Map();
    this.setUrls();
    this.setAmounts();

    this.loadLastMovements();

  }

  //set URLs map for setAmounts()
  setUrls() {
    this.urls = GENERAL_URLS;
  }

  //set amounts of equipment to display
  setAmounts() {
    for (let key in this.urls) {
      this._http.loadMaterial(this.urls[key]).subscribe(data => this.amounts.set(key, data.count));
    }
  }


  //load last movements
  loadLastMovements() {
    this.recentlyReceived = this._http.loadRecentlyReceived();
    this.recentlyGone = this._http.loadRecentlyGone();
  }


  //get today date YYYY-MM-DD - 1week
  getToday() {
    let date = new Date();
    let today = [date.getFullYear(), date.getUTCMonth() + 1, date.getUTCDate()]
    let lastWeek;
    if (today[2] > 7) {
      lastWeek = [today[0], today[1], today[2] -= 7]
    }
    else if (today[1] > 1) {
      lastWeek = [today[0], today[1] - 1, 31 - 7 + today[2]]


    } else {
      lastWeek = [today[0] - 1, 12, 24 + today[2]]

    }

    return lastWeek.join('-');
  }



  getLastMovement() {
    let lastMovements = []
    const urls = ['sails', 'boards', 'beginners', 'accessories']
    let filterUrl = '/?whenCame__gt=' + this.getToday();
    for (let k in urls) {
      this._http.loadMaterial(urls[k] + filterUrl).subscribe(data => lastMovements.push(data));
      console.log(lastMovements)
    }
  }


  printList() {
    let datas={}
    if (this.listSails) {
      let fullSailsList = this._loader.loadMaterial('sails/');
      
      if (this.availableSails) {
        var availableSailsList = fullSailsList[0]
      }
      if (this.repairedSails) {
        var repairedSailsList = fullSailsList[1]
      }
      if (this.soldSails) {
        var soldSailsList = fullSailsList[2]
      }
      datas['sailsData']={ 'availableItems': availableSailsList, 'repairedItems': repairedSailsList, 'soldItems': soldSailsList }
    }
    if (this.listBoards) {
      let fullBoardsList = this._loader.loadMaterial('boards/');
      if (this.availableBoards) {
        var availableBoardsList = fullBoardsList[0]
      }
      if (this.repairedBoards) {
        var repairedBoardsList = fullBoardsList[1]
      }
      if (this.soldBoards) {
        var soldBoardsList = fullBoardsList[2]

      }
      datas['boardsData']= { 'availableItems': availableBoardsList, 'repairedItems': repairedBoardsList, 'soldItems': soldBoardsList }

    }
    if(this.listBeginners){
      let fullBeginnersList=this._loader.loadBasicMaterial('beginners');
      datas['beginnersData']={'equipmentList':fullBeginnersList};
    }
    if(this.listAccessories){
      let fullAccessoriesList=this._loader.loadBasicMaterial('accessories');
      datas['accessoriesData']={'equipmentList':fullAccessoriesList};
    }
    
    const dialogRef = this.dialog.open(GeneralPrintingComponent, {
      data: {
        datas
      }
    });

  }

  sendReport(value, fromDate?, tillDate?) {
    let whatMaterial = []
    if (this.reportSails) { whatMaterial.push('sail') }
    if (this.reportBoards) { whatMaterial.push('board') }
    if (this.reportBeginners) { whatMaterial.push('beginners') }
    if (this.reportAccessories) { whatMaterial.push('accessories') }

    if (value == 'custom') {
      if (fromDate == '') {
        alert('You must choose first date or check "Today" to send report from today.')
      } else if (tillDate == '') {
        alert('You must choose last date or check "Today" to send report from today.')
      }
      else {
        this._http.sendReport(whatMaterial, fromDate, tillDate)
      }
      // console.log(value, whatMaterial, fromDate, tillDate)
    }
    else {
      this._http.sendReport(whatMaterial)
    }
  }
  //set [min] for second picker when first date set
  dateFilter2(d: Date) {
    this.lastDate = d;
  }


  //set up visibility of checkGroups
  getSailsGroupClass() {
    return this.getGroupClass(this.listSails);
  }
  getBoardsGroupClass() {
    return this.getGroupClass(this.listBoards);
  }


  getGroupClass(field: boolean) {
    if (field == true) {
      return 'visibleCheckGroup'
    }
    else {
      return 'unvisibleCheckGroup'
    }
  }


}
