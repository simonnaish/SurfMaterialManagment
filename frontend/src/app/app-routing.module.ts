import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GeneralComponent } from 'src/app/general/general.component'
import {BoardsComponent } from 'src/app/boards/boards.component';
import { SailsComponent } from './sails/sails.component';
import {BeginnersComponent } from 'src/app/beginners/beginners.component';
import {AccessoriesComponent } from 'src/app/accessories/accessories.component';

const routes: Routes = [
  { path: '', component: GeneralComponent},
  { path: 'sails', component: SailsComponent},
  { path: 'boards', component: BoardsComponent},
  { path: 'beginners', component: BeginnersComponent},
  { path: 'accessories', component: AccessoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
