import { Component } from '@angular/core';
import { Router } from '@angular/router'


import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
const MatTooltipCustomOptions: MatTooltipDefaultOptions = {
  showDelay: 800,
  hideDelay: 500,
  touchendHideDelay: 500,
};
export var active = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{
    provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: MatTooltipCustomOptions

  }]
})
export class AppComponent {
  title = 'rene';
  navLinks: any[];
  // activeLinkIndex=-1;
  constructor(private router: Router, private dialog: MatDialog) {
    this.navLinks = [
      {
        label: 'General',
        link: '/',
        index: 0,
        detail: 'Go to main page...'
      },
      {
        label: 'Sails',
        link: '/sails',
        index: 1,
        detail: 'Manage sails...'
      },
      {
        label: 'Boards',
        link: '/boards',
        index: 2,
        detail: 'Manage boards...'
      },
      {
        label: 'Beginners',
        link: '/beginners',
        index: 3,
        detail: 'Manage beginners material...'
      },
      {
        label: 'Accessories',
        link: '/accessories',
        index: 4,
        detail: 'Manage accessories...'
      }
    ]
  }

  
  
  loginStatus = 'LOG IN'
  //open login dialog or logout user
  loginUser() {
    if (active == false) {
      const dialogRef = this.dialog.open(LoginDialogComponent);

      dialogRef.afterClosed().subscribe((confirmed: Boolean) => {
        if (confirmed) {
          active = true
          this.loginStatus = 'LOG OUT'
        }
      })


    } else {
      active = false
      this.loginStatus = 'LOG IN'
    }
    console.log(active)
  }

  //set up different color depend if user in logged
  getLoginButtonBackground(){
    if(active==true){
      return 'logoutButton'
    }else{
      return 'loginButton'
    }
  }
}
