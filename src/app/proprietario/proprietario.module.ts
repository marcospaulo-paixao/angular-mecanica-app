import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietarioRoutingModule } from './proprietario-routing.module';
import { ProprietarioListComponent } from './list/proprietario-list.component';
import { ProprietarioFormComponent } from './form/proprietario-form.component';
import { ProprietarioService } from './proprietario.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProprietarioListComponent, ProprietarioFormComponent],
  imports: [CommonModule, ProprietarioRoutingModule, FormsModule],
  providers: [ProprietarioService],
})
export class ProprietarioModule {}
