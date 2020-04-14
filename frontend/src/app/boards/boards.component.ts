import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { CRUDServiceService } from '../services/crudservice.service';

import { Material } from '../models/material';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {


  //type of Material
  material: Material;

  //set up map with details of type of material to pass to child component
  constructor(private _http: CRUDServiceService) {
    this.material = { 'type': 'board', 'idExample': 'IG203', 'imageUrl': './assets/img/jp_board.png', 'imageAlt': 'board icon', 'apiUrl': 'boards/' }
  }
  ngOnInit(): void {
  }


}
