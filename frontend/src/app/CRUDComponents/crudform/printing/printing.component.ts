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

  avaibleItems = new MatTableDataSource(this.data['avaibleItems'])
  repairedItems = new MatTableDataSource(this.data['repairedItems'])
  soldItems = new MatTableDataSource(this.data['soldItems'])

  // SORTING TABLES
  @ViewChild('avaibleItemsSort', { static: true }) avaibleItemsSort: MatSort;
  @ViewChild('repairedItemsSort', { static: true }) repairedItemsSort: MatSort;
  @ViewChild('soldItemsSort', { static: true }) soldItemsSort: MatSort;

  //PAGINATOR 
  @ViewChild('avaibleItemsPaginator', { static: true }) avaibleItemsPaginator: MatPaginator;
  @ViewChild('repairedItemsPaginator', { static: true }) repairedItemsPaginator: MatPaginator;
  @ViewChild('soldItemsPaginator', { static: true }) soldItemsPaginator: MatPaginator;


  constructor(public dialogRef: MatDialogRef<PrintingComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _http: CRUDServiceService) {

  }
  displayedAvaibleColumns: string[] = ['id', 'category', 'brand', 'model', 'type', 'size', 'whenCame']
  displayedRepairedColumns: string[] = ['id', 'category', 'brand', 'model', 'type', 'size', 'whenGone']
  displayedSoldColumns: string[] = ['id', 'category', 'brand', 'model', 'type', 'size', 'whenSold']



  ngOnInit(): void {
    this.avaibleItems.sort = this.avaibleItemsSort;
    this.repairedItems.sort = this.repairedItemsSort;
    this.soldItems.sort = this.soldItemsSort;

    this.avaibleItems.paginator = this.avaibleItemsPaginator;
    this.repairedItems.paginator = this.repairedItemsPaginator;
    this.soldItems.paginator = this.soldItemsPaginator;
    console.log(this.avaibleItems)
  }


}
