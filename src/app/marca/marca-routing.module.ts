import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcaFormComponent } from './form/marca-form.component';
import { MarcaListComponent } from './list/marca-list.component';

const routes: Routes = [
  { path: 'form', component: MarcaFormComponent },
  { path: '', component: MarcaListComponent },
  { path: 'form/:id', component: MarcaFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcaRoutingModule {}
