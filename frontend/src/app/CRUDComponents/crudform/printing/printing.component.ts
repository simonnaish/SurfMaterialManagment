import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


import { CRUDServiceService } from 'src/app/services/crudservice.service';


@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.scss']
})


export class PrintingComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<PrintingComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }
 


  ngOnInit(): void {
  }


}
