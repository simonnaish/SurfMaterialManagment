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

  apiUrl = 'accessories/'
  apiFilterUrl = 'accessories/?'

  constructor() {

  }

  ngOnInit(): void {
    this.loadEquipment();
    
  }

  loadEquipment() {
    this.equipment = {
      'Wetsuit': { 'Unisex': ['XXS', 'XS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], 'Man': ['XXS', 'XS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], 'Woman': ['XXS', 'XS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], 'Kid':[6,8,10,12,14] },
      'Harness': { 'Mystic': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],'NP': ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      'Harness Lines': { 'Severne': ['22"-28"', '28"-32"'] },
      'Boom': { 'Severne Metal': ['140-190', '170-220'], 'Severne Enigma': ['140-190', '170-220'], 'Beginner': ['custom'] },
      'Mast': { 'Severne Gorilla': [340, 370, 400, 430, 460, 490], 'Severne Blue': [340, 370, 400, 430, 460, 490], 'Beginner': ['custom'] },
      'Extension': { 'Severne ALU': [24, 36], 'Severne CARBON': [24, 36] },
      'Mast Base': { 'Severne': ['standard'], 'Others': ['standard'] },

    }
  };
}
