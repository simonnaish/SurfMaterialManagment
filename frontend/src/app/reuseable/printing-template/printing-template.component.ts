import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-printing-template',
  templateUrl: './printing-template.component.html',
  styleUrls: ['./printing-template.component.scss']
})
export class PrintingTemplateComponent implements OnInit {


  @Input()
  data: []


  // SORTING TABLES
  @ViewChild('availableItemsSort', { static: true }) availableItemsSort: MatSort;
  @ViewChild('repairedItemsSort', { static: true }) repairedItemsSort: MatSort;
  @ViewChild('soldItemsSort', { static: true }) soldItemsSort: MatSort;

  //PAGINATOR 
  @ViewChild('availableItemsPaginator', { static: true }) availableItemsPaginator: MatPaginator;
  @ViewChild('repairedItemsPaginator', { static: true }) repairedItemsPaginator: MatPaginator;
  @ViewChild('soldItemsPaginator', { static: true }) soldItemsPaginator: MatPaginator;

  


  availableItems
  repairedItems
  soldItems

  displayedAvailableColumns: string[] = ['id', 'category', 'brand', 'model', 'type', 'size', 'whenCame']
  displayedRepairedColumns: string[] = ['id', 'category', 'brand', 'model', 'type', 'size', 'whenGone']
  displayedSoldColumns: string[] = ['id', 'category', 'brand', 'model', 'type', 'size', 'whenSold']


  constructor() {

  }




  ngOnInit(): void {
    this.availableItems = new MatTableDataSource(this.data['availableItems'])
    this.repairedItems = new MatTableDataSource(this.data['repairedItems'])
    this.soldItems = new MatTableDataSource(this.data['soldItems'])


    this.availableItems.sort = this.availableItemsSort;
    this.repairedItems.sort = this.repairedItemsSort;
    this.soldItems.sort = this.soldItemsSort;





    this.availableItems.paginator = this.availableItemsPaginator;
    this.repairedItems.paginator = this.repairedItemsPaginator;
    this.soldItems.paginator = this.soldItemsPaginator;

  }
  

  //TODO: hide table if list is empty
  // checkVisibility(list: []) {
  //   if (list.length > 0) {
  //     return 'visible'
  //   }else{
  //     return 'hidden'
  //   }
  // }

}
