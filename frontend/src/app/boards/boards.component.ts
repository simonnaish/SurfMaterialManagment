import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { CRUDServiceService } from '../services/crudservice.service';

import { Material } from '../models/material';
import { Board } from '../models/board';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {


  //type of Material
  material: Material;
  //List of sails
  materialList$: Observable<Board[]>;

    //single item passed to detail component
    item: Board;

  constructor(private _http: CRUDServiceService) { 
  this.material = { 'type': 'board', 'idExample': 'IG203', 'imageUrl': './assets/img/jp_board.png', 'imageAlt': 'board icon' }
}
ngOnInit(): void {
  this.loadBoards();

 

}

loadBoards(){
  this.materialList$=this._http.loadBoards2();
}

addBoard(){
  let board= <Board>{
    id:'SRC222', 
    type:'freeride',
    category: "world cup",
    model: 'Super Ride',
    size: 124,
    year: 2020
  };
  console.log(board.id);
  this._http.addBoard('SSS333').subscribe(()=>console.log('correct'));
}

setUpItem(board: Board){
  this.item=board;
}

}
