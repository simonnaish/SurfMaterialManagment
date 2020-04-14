import { Component, OnInit, Input } from '@angular/core';
import { Material } from 'src/app/models/material';
import { CRUDServiceService } from 'src/app/services/crudservice.service';

@Component({
  selector: 'app-display-form',
  templateUrl: './display-form.component.html',
  styleUrls: ['./display-form.component.scss']
})
export class DisplayFormComponent implements OnInit {


  @Input()
  material: Material;

  @Input()
  items: any[];

  @Input()
  iconUrl: string;

  @Input()
  apiUrl: string;

  constructor(private _http: CRUDServiceService) { }

  ngOnInit(): void {
  }


  //send PUT request from service. Receive material.
  addItem(id: string) {
    this._http.recieveUsedItem(this.apiUrl, id);
    alert(id + ' is back in the center.')
  }

  //send PUT request from service. Send to taller
  repairItem(id: string) {
    this._http.repairItem(this.apiUrl, id);
    alert(id + ' sent to repair.')
  }

  //send PUT request from service. Send to megastore.
  sellItem(id: string) {
    this._http.sellItem(this.apiUrl, id);
    alert(id + ' sent to megastore.')
  }

}
