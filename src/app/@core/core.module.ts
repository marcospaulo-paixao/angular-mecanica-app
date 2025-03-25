import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AlertComponent} from "./components/alert.component";
import {AlertService} from "./service/alert.service";
import {NavbarComponent} from "./components/navbar.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [AlertComponent, NavbarComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [AlertComponent, NavbarComponent],
  providers: [AlertService],
})
export class CoreModule {
}
