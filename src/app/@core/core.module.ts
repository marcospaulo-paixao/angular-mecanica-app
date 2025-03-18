import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AlertComponent} from "./components/alert.component";
import {AlertService} from "./service/alert.service";


@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, FormsModule],
  exports: [AlertComponent],
  providers: [AlertService],
})
export class CoreModule {
}
