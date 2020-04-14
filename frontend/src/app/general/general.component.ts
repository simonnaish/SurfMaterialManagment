import { Component, OnInit } from '@angular/core';
import { CRUDServiceService } from '../services/crudservice.service';
import { empty, Observable } from 'rxjs';
import { tap, subscribeOn } from 'rxjs/operators';

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

  accessoriesUrl = 'accessories/?type='

  constructor(private _http: CRUDServiceService) {


  }

  ngOnInit(): void {

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


  testing() {


  }
}
