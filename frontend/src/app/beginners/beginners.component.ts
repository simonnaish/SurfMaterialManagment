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



  constructor(private _http: CRUDServiceService) {
  }

  ngOnInit(): void {
    this.loadEquipment();
  }

  loadEquipment() {
    let temporary: any[] = [];
    this._http.loadBeginners().forEach(data => temporary.push(data)).finally; {
      this.equipment = temporary;
    };


  }


 



  


  

}
