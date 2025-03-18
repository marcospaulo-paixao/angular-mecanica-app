import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'carro', pathMatch: 'full'}, // REDIRECIONAR PARA O CARRO
  {
    path: 'carro',
    loadChildren: () =>
      import('./carro/carro.module').then((m) => m.CarroModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
