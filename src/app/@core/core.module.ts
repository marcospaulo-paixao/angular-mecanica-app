import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Alert, AlertItem} from "./components/alert";
import {AlertService} from "./service/alert.service";
import {NavbarComponent} from "./components/navbar.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [Alert, AlertItem, NavbarComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [Alert, NavbarComponent],
  providers: [AlertService],
})
export class CoreModule {
}
