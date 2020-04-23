import { Component, OnInit } from '@angular/core';

import {standardUser} from '../reuseable/constants'
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit(): void {
  }

  onYesClick(username:string, password:string){
    if(username==standardUser.username){
      if(password==standardUser.password){
        this.dialogRef.close(true);
      }else{
        alert('Password is incorrect.')
      }
    }else{
      alert('User does not exist.')
    }
  }

}
