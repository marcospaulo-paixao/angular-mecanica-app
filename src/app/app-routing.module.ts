import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'carro',
    loadChildren: () =>
      import('./carro/carro.module').then((m) => m.CarroModule),
  },
  {
    path: 'marca',
    loadChildren: () =>
      import('./marca/marca.module').then((m) => m.MarcaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
