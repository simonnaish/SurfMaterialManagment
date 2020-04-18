import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-general-printing',
  templateUrl: './general-printing.component.html',
  styleUrls: ['./general-printing.component.scss'],

})
export class GeneralPrintingComponent implements OnInit {

  sailsData:[]
  boardsData:[]
  beginnersData:[]
  accessoriesData:[]

  constructor(public dialogRef: MatDialogRef<GeneralPrintingComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.sailsData=data.datas.sailsData
      this.boardsData=data.datas.boardsData
      this.beginnersData=data.datas.beginnersData
      this.accessoriesData=data.datas.accessoriesData
  }


  ngOnInit(): void {
      // this.boardsData=data.boardsData
      // console.log(this.boardsData)
  }

}
