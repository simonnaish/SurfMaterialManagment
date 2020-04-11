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
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { CdkTableExporterModule } from 'cdk-table-exporter';




import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

export const DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM-YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};


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
        MatDialogModule,
        MatExpansionModule,
        MatTableModule,
        MatSortModule,
        MatTableExporterModule,
        CdkTableExporterModule
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
        MatDialogModule,
        MatExpansionModule,
        MatTableModule,
        MatSortModule,
        MatTableExporterModule,
        CdkTableExporterModule
    ],
    providers: [

        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format }
    ]
})
export class MaterialModule { }
