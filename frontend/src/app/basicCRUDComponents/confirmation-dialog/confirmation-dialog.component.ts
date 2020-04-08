import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CRUDServiceService } from 'src/app/services/crudservice.service';
import { BasicCRUDComponent } from '../basic-crud/basic-crud.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  listOfChanges: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _http: CRUDServiceService) {
    this.listOfChanges = data;
  }



  ngOnInit(): void {
  }

  onYesClick() {
    this.dialogRef.close(true);
  }

}
