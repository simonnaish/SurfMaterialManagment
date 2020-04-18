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
import { GeneralPrintingComponent } from './general/general-printing/general-printing.component';
import { materialLoaders } from './reuseable/materialLoader';
import { PrintingTemplateComponent } from './reuseable/printing-template/printing-template.component';
import { BasicPrintingTemplateComponent } from './reuseable/basic-printing-template/basic-printing-template.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';



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
    BasicPrintingComponent,
    GeneralPrintingComponent,
    PrintingTemplateComponent,
    BasicPrintingTemplateComponent,
    LoginDialogComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    materialLoaders

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
