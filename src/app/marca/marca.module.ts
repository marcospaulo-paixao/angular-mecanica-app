import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaListComponent } from './list/marca-list.component';
import { MarcaFormComponent } from './form/marca-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MarcaListComponent,
    MarcaFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MarcaRoutingModule
  ]
})
export class MarcaModule { }
