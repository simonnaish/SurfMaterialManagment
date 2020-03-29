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

  constructor(private _snackBar: MatSnackBar, private _materialList: CRUDServiceService) {
    this.alertDuration = 2000;

    this.material = { 'type': 'sail', 'idExample': 'FR44201', 'imageUrl': './assets/img/sail.png', 'imageAlt': 'sail icon' }

  }


  //unused yet! TODO change alert to snackbars
  openSnackBar(message: string) {
    this._snackBar.open(message ? message : this.errorMessage, 'close', { duration: this.alertDuration });
  }
  ngOnInit(): void {
    this.materialList$ = this._materialList.loadSails();
  }

  setUpItem(sail: Sail) {
    this.item = sail;
  }

}
