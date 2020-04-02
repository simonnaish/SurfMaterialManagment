import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CRUDServiceService } from 'src/app/services/crudservice.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  // @Input()
  listOfChanges: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _http: CRUDServiceService) {
    this.listOfChanges = data;
  }

  // this.listOfChanges=[1,2,3]


  ngOnInit(): void {
    // console.log(this.listOfChanges);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {

    this.dialogRef.close();
  }

}
