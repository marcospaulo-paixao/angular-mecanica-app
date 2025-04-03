import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeloListComponent } from './list/modelo-list.component';
import { ModeloFormComponent } from './form/modelo-form.component';

const routes: Routes = [
  { path: '', component: ModeloListComponent },
  { path: 'form', component: ModeloFormComponent },
  { path: 'form/:id', component: ModeloFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModeloRoutingModule {}
