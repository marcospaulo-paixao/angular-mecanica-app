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
  {
    path: 'modelo',
    loadChildren: () =>
      import('./modelo/modelo.module').then((m) => m.ModeloModule),
  },
  {
    path: 'proprietario',
    loadChildren: () =>
      import('./proprietario/proprietario.module').then(
        (m) => m.ProprietarioModule
      ),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./usuario/usuario.module').then((m) => m.UsuarioModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
