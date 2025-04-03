import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModeloRoutingModule } from './modelo-routing.module';
import { ModeloService } from './modelo.service';
import { ModeloListComponent } from './list/modelo-list.component';
import { ModeloFormComponent } from './form/modelo-form.component';

@NgModule({
  declarations: [
    ModeloListComponent,
    ModeloFormComponent
  ],
  imports: [CommonModule, FormsModule, ModeloRoutingModule],
  providers: [ModeloService],
})
export class ModeloModule {}
