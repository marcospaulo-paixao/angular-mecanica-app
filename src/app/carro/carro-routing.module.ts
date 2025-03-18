import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarroListComponent } from './list/carro-list.component';
import { CarroFormComponent } from './form/carro-form.component';

const routes: Routes = [
  { path: '', component: CarroListComponent },
  { path: 'form', component: CarroFormComponent },
  { path: 'form/:id', component: CarroFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarroRoutingModule {}
