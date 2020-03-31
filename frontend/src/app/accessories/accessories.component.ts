import { Component, OnInit } from '@angular/core';
import { CRUDServiceService } from '../services/crudservice.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {

  equipment: any;

  constructor(private _http: CRUDServiceService) {

  }

  ngOnInit(): void {
    this.loadEquipment();
    
  }


  loadEquipment() {
    let temporary: any[] = [];
    this._http.getAccessories().forEach(data => temporary.push(data)).finally; {
      this.equipment = temporary;
    };
  }
}
