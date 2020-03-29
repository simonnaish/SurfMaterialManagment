import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beginners',
  templateUrl: './beginners.component.html',
  styleUrls: ['./beginners.component.scss']
})
export class BeginnersComponent implements OnInit {

  material:any;

  constructor() { 
    // this.material={"Boards":{"Starboard Start":["S","M","L"]}, {"Starboard Rio":['S','M','L']}, {"Funster", "Funster Explorer/Sport", "Sails":['Synergry',"Redback", "Unifieber" ]}
    this.material={"Boards":{"Starboard Start":['S','M','L'], "Starboard Rio":['S','M','L'], "Fanatic Funster":[160,180,205,240], "Fanatic Explorer/Sport":[145,165,195]}, "Sails":{"Synergy":[1.2,2.1, 2.6, 3.1, 3.6, 4.1], "XS":[2.0, 2.5, 3.0]}}
  }
  
  ngOnInit(): void {
  }

}
