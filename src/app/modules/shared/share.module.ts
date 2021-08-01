import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from 'ng2-ckeditor';
import { FieldErrorDisplayComponent } from '../layout/components/field-error-display/field-error-display.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DeleteDialogComponent } from '../layout/components/delete-dialog/delete-dialog.component';
import { PaginationComponent } from '../layout/components/pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from "ngx-spinner";
import {PopoverModule} from "ngx-smart-popover";


@NgModule({
  declarations: [
    FieldErrorDisplayComponent, PaginationComponent, DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule,
    NgxSpinnerModule,
    PopoverModule
  ],
  exports: [
    FieldErrorDisplayComponent,
    PaginationComponent,
    CommonModule,
    PopoverModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DeleteDialogComponent,
    NgxSpinnerModule,
    
  ],
  entryComponents: [

  ]
})
export class SharedModule { }