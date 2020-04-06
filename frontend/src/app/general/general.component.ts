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

  amounts: Map<string, number>;

  constructor(private _http: CRUDServiceService) {


  }

  ngOnInit(): void {
    this.amounts = new Map();
    this.setAmounts();
  }

  setAmounts() {
    this._http.loadSails2().subscribe(data => this.amounts.set('sails', data.count));
    this._http.loadBoards2().subscribe(data => this.amounts.set('boards', data.count));

  }

 
  testing() {
    console.log('clicked');
  
  }
}
