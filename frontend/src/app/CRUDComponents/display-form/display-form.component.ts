import { Component, OnInit, Input } from '@angular/core';
import { Material } from 'src/app/models/material';

@Component({
  selector: 'app-display-form',
  templateUrl: './display-form.component.html',
  styleUrls: ['./display-form.component.scss']
})
export class DisplayFormComponent implements OnInit {


  @Input()
  material: Material;

  @Input()
  items:any[];

  @Input()
  iconUrl:string;

  constructor() { }

  ngOnInit(): void {
  
    console.log(this.iconUrl);
  }

}
