import { Component, OnInit } from '@angular/core';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscribable, Subscription } from 'rxjs';


import { Material } from '../models/material';
import { Sail } from '../models/sail';

import { CRUDServiceService } from 'src/app/services/crudservice.service';


// export interface User {
//   name: string;
// }

@Component({
  selector: 'app-sails',
  templateUrl: './sails.component.html',
  styleUrls: ['./sails.component.scss']
})
export class SailsComponent implements OnInit {
  errorMessage: string;
  alertDuration: number;

  //type of Material
  material: Material;
  //List of sails
  materialList$: Observable<Sail[]>;

  //single item passed to detail component
  item: Sail;

  constructor(private _snackBar: MatSnackBar, private _http: CRUDServiceService) {
    this.alertDuration = 2000;

    this.material = { 'type': 'sail', 'idExample': 'FR44201', 'imageUrl': './assets/img/sail.png', 'imageAlt': 'sail icon' }

  }


  //unused yet! TODO change alert to snackbars
  openSnackBar(message: string) {
    this._snackBar.open(message ? message : this.errorMessage, 'close', { duration: this.alertDuration });
  }
  ngOnInit(): void {
    this.loadSails();
    // let sail= <Sail>{
    //   id:'S148209', 
    //   type:'wave',
    //   category: "world cup",
    //   model: 'S1',
    //   size: 4.8,
    //   year: 2020,
    //   whenCame: new Date(20, 1, 2020),
    //   whenGone: new Date(21, 2,2020),
    //   whenSold: new Date(23, 3, 2020),
    //   repair: false,
    //   sold: true };


    // this.addSail(sail)
  }

  setUpItem(sail: Sail) {
    this.item = sail;
  }

  loadSails(){
    this.materialList$=this._http.loadSails();
  }

  addSail(sail:Sail){
    this._http.addSail(sail);
  
  }


}
