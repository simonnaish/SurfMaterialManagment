import { Component, OnInit } from '@angular/core';
import { CRUDServiceService } from '../services/crudservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-beginners',
  templateUrl: './beginners.component.html',
  styleUrls: ['./beginners.component.scss']
})
export class BeginnersComponent implements OnInit {

  //Observable with list of equipment and amount
  equipment: any;

  apiUrl = 'beginners/'
  apiFilterUrl = 'beginners/?'


  constructor() {
  }

  ngOnInit(): void {
    this.loadEquipment();
  }

  loadEquipment() {
    this.equipment = {
      'Sail': { 'Synergry': [1.2, 2.1, 2.6, 3.1, 3.6, 4.1], 'XS': [2.0, 2.5, 3.0] },
      'Board': { 'JP Funster': [160, 180, 205, 240], 'JP Explorer': [145, 165, 195], 'Starboard Rio': ['S', 'M', 'L'], 'Starboard Start': ['S', 'M', 'L'] }
    }
  };



  test(): void {

  }


}












