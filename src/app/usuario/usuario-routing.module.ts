import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioListComponent } from './list/usuario-list.component';
import { UsuarioFormComponent } from './form/usuario-form.component';

const routes: Routes = [
  { path: '', component: UsuarioListComponent },
  { path: 'form', component: UsuarioFormComponent },
  { path: 'form/:id', component: UsuarioFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
