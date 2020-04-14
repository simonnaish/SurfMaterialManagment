import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GeneralComponent } from './general/general.component';
import { SailsComponent } from './sails/sails.component';
import { BoardsComponent } from './boards/boards.component';
import { BeginnersComponent } from './beginners/beginners.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { CRUDFormComponent } from './CRUDComponents/crudform/crudform.component';
import { DisplayFormComponent } from './CRUDComponents/display-form/display-form.component';

import { MaterialModule } from 'src/app/material.module';
import { BasicCRUDComponent } from './basicCRUDComponents/basic-crud/basic-crud.component';
import { ConfirmationDialogComponent } from './basicCRUDComponents/confirmation-dialog/confirmation-dialog.component';
import { PrintingComponent } from './CRUDComponents/crudform/printing/printing.component';
import { BasicPrintingComponent } from './basicCRUDComponents/basic-printing/basic-printing.component';

// import {Material} from 'src/app/models/material';


@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    SailsComponent,
    BoardsComponent,
    BeginnersComponent,
    AccessoriesComponent,
    CRUDFormComponent,
    DisplayFormComponent,
    BasicCRUDComponent,
    ConfirmationDialogComponent,
    PrintingComponent,
    BasicPrintingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
