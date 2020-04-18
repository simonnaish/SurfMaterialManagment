import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-basic-printing-template',
  templateUrl: './basic-printing-template.component.html',
  styleUrls: ['./basic-printing-template.component.scss']
})
export class BasicPrintingTemplateComponent implements OnInit {


  @Input()
  data
  dataSource

  displayedColumns: string[] = ['type', 'model', 'size', 'amount']


  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data['equipmentList'])
    this.dataSource.sort = this.listSort;

    this.dataSource.paginator = this.listPaginator;
  

  }


  // SORTING TABLES
  @ViewChild('listSort', { static: true }) listSort: MatSort;

  //PAGINATOR 
  @ViewChild('listPaginator', { static: true }) listPaginator: MatPaginator;


}
