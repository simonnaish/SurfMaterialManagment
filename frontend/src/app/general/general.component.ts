import { Component, OnInit } from '@angular/core';
import { CRUDServiceService } from '../services/crudservice.service';

import { materialLoaders } from '../reuseable/materialLoader';



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
  listSails=true
  listBoards=true
  listBeginners=true
  listAccessories=true

  //checkboxes for report
  reportSails=true
  reportBoards=true
  reportBeginners=true
  reportAccessories=true


  accessoriesUrl = 'accessories/?type='

  constructor(private _http: CRUDServiceService, private _loader:materialLoaders) {


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
    this.urls = {
      sails: 'sails/', worldCupSails: 'sails/?category=world%20cup', premiumSails: 'sails/?category=premium', boards: 'boards/',
      premiumBoards: 'boards/?category=premium', worldCupBoards: 'boards/?category=world%20cup', sportBoards: 'boards/?category=sport',
      beginnerBoards: 'beginners/?type=Board', beginnerSails: 'beginners/?type=Sail',
      masts: this.accessoriesUrl + 'Mast', worldCupMasts: this.accessoriesUrl + 'Mast&model=Severne Gorilla', premiumMasts: this.accessoriesUrl + 'Mast&model=Severne Blue',
      beginnerMasts: this.accessoriesUrl + 'Mast&model=Beginner',
      booms: this.accessoriesUrl + 'Boom', premiumBooms: this.accessoriesUrl + 'Boom&model=Severne Enigma', worldCupBooms: this.accessoriesUrl + 'Boom&model=Severne Enigma',
      beginnerBooms: this.accessoriesUrl + 'Boom&model=Beginner',
      extensions: this.accessoriesUrl + 'Extension',
      mastBases: this.accessoriesUrl + 'Mast%20Base',
      wetsuits: this.accessoriesUrl + 'Wetsuit', unisexWetsuits: this.accessoriesUrl + 'Wetsuit&model=Unisex', manWetsuits: this.accessoriesUrl + 'Wetsuit&model=Man',
      womanWetsuits: this.accessoriesUrl + 'Wetsuit&model=Woman', kidWetsuits: this.accessoriesUrl + 'Wetsuit&model=Kid',
      harnesses: this.accessoriesUrl + 'Harness',
      harnesLines: this.accessoriesUrl + 'Harness%20Lines'
    }
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

  printList(){
    let whatMaterial=[]
    if(this.listSails){
      whatMaterial.push('sail')
      var sailsLists=this._loader.loadMaterial('sails/')
    }
    if(this.listBoards){
      whatMaterial.push('board')
      var boardsLists=this._loader.loadMaterial('boards/')
    }
    if(this.listBeginners){whatMaterial.push('beginners')}
    if(this.listAccessories){whatMaterial.push('accessories')}
    console.log(sailsLists)
    console.log(boardsLists)
    
  }

  setMaterial(apiUrl){
    let repairedItems=[]
    let soldItems=[]
    let avaibleItems=[]
    this._http.loadMaterial(apiUrl).forEach(iter => iter.results.forEach(item => {
      if (item.repair == true) {
        repairedItems.push(item);
      }
      else if (item.sold == true) {
        soldItems.push(item)
      } else {
        avaibleItems.push(item);
      }
    }));
    return[avaibleItems, repairedItems, soldItems]
  }

  // setBasicMaterial


  sendReport(value, fromDate?, tillDate?) {
    let whatMaterial=[]
    if(this.reportSails){whatMaterial.push('sail')}
    if(this.reportBoards){whatMaterial.push('board')}
    if(this.reportBeginners){whatMaterial.push('beginners')}
    if(this.reportAccessories){whatMaterial.push('accessories')}

    if(value=='custom'){
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
    else{
      this._http.sendReport(whatMaterial)
    }
  }
  //set [min] for second picker when first date set
  dateFilter2(d: Date) {
    this.lastDate = d;
  }


}
