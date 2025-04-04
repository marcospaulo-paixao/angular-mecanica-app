import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioService } from './usuario.service';
import { UsuarioListComponent } from './list/usuario-list.component';
import { UsuarioFormComponent } from './form/usuario-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, UsuarioRoutingModule],
  providers: [UsuarioService],
  declarations: [
    UsuarioListComponent,
    UsuarioFormComponent
  ],
})
export class UsuarioModule {}
