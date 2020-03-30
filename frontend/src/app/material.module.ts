import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatTabsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatSelectModule,
        MatTooltipModule,
        MatBadgeModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatDividerModule,
        MatListModule,
        MatDialogModule
        ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatTabsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatSelectModule,
        MatTooltipModule,
        MatBadgeModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatDividerModule,
        MatListModule,
        MatDialogModule
        ]
})
export class MaterialModule { }
