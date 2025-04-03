import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProprietarioListComponent } from './list/proprietario-list.component';
import {ProprietarioFormComponent } from './form/proprietario-form.component';

const routes: Routes = [
  { path: '', component: ProprietarioListComponent },            
  { path: 'form', component: ProprietarioFormComponent },         
  { path: 'form/:id', component: ProprietarioFormComponent }      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietarioRoutingModule { }
