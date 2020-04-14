import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-basic-printing',
  templateUrl: './basic-printing.component.html',
  styleUrls: ['./basic-printing.component.scss']
})
export class BasicPrintingComponent implements OnInit {

  dataSource = new MatTableDataSource(this.data['equipmentList'])


  // SORTING TABLES
  @ViewChild('listSort', { static: true }) listSort: MatSort;

  //PAGINATOR 
  @ViewChild('listPaginator', { static: true }) listPaginator: MatPaginator;


  constructor(public dialogRef: MatDialogRef<BasicPrintingComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }
  displayedColumns: string[] = ['type', 'model', 'size', 'amount']


  ngOnInit(): void {
    this.dataSource.sort = this.listSort;

    this.dataSource.paginator = this.listPaginator;
  }

}
