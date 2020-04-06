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
  urls:{};

  constructor(private _http: CRUDServiceService) {


  }

  ngOnInit(): void {
    this.urls={sails:'sails/', boards:'boards/'}
    this.amounts = new Map();
    this.setAmounts();
  }

  setAmounts() {
    for(let key in this.urls){
        this._http.loadMaterial(this.urls[key]).subscribe(data=>this.amounts.set(key, data.count));
        // console.log(this.urls[key])
    }
    console.log(this.amounts);
  }

 
  testing() {
    this.setAmounts()
    console.log('clicked');
  
  }
}
