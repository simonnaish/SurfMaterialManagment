import { Component, OnInit } from '@angular/core';


import { MatSnackBar } from '@angular/material/snack-bar';


import { Material } from '../models/material';

import { CRUDServiceService } from 'src/app/services/crudservice.service';
import { HttpClient } from '@angular/common/http';


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


  constructor(private _snackBar: MatSnackBar, private _http: CRUDServiceService, private http: HttpClient) {
    this.alertDuration = 2000;

    this.material = { 'type': 'sail', 'idExample': 'FR44201', 'imageUrl': './assets/img/sail.png', 'imageAlt': 'sail icon', 'apiUrl': 'sails/' }

  }

  ngOnInit(): void {
  }




}
