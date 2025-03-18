import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CarroRoutingModule} from './carro-routing.module';
import {CarroListComponent} from './list/carro-list.component';
import {CarroService} from './carro.service';
import {CarroFormComponent} from './form/carro-form.component';

@NgModule({
  declarations: [CarroListComponent, CarroFormComponent],
  imports: [CommonModule, FormsModule, CarroRoutingModule],
  providers: [CarroService],
})
export class CarroModule {
}
