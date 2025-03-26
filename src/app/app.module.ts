import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './@core/core.module';
import { InicioModule } from './inicio/inicio.module';
import { CarroModule } from './carro/carro.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    InicioModule,
    CarroModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
