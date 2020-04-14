import { Component } from '@angular/core';
import { Router } from '@angular/router'


import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';

const MatTooltipCustomOptions: MatTooltipDefaultOptions = {
  showDelay: 800,
  hideDelay: 500,
  touchendHideDelay: 500,
};

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
  constructor(private router: Router) {
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
}
