import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Alert, AlertItem} from "./components/alert";
import {AlertService} from "./service/alert.service";
import {Navbar} from "./components/navbar";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [Alert, AlertItem, Navbar],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [Alert, Navbar],
  providers: [AlertService],
})
export class CoreModule {
}
