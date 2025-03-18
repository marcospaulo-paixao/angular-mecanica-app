import { Component } from '@angular/core';
import { AlertService } from '../service/alert.service';


@Component({
  selector: 'app-alert',
  template: `
    <div class="alert-container">
      <div
        *ngFor="let alert of alertService.alerts"
        [class]="'alert ' + alert.type"
        role="alert"
      >
        {{ alert.description }}
      </div>
    </div>
  `,
  styles: [
    `
      .alert-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1050;
        display: flex;
        flex-direction: column;
        gap: 10px; /* Espaço entre os alerts */
        align-items: flex-end; /* Certifica que os alerts estão alinhados à direita */
      }

      .alert {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        border-radius: 4px;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
      }

      .btn-close {
        border: none;
        background: transparent;
        cursor: pointer;
      }
    `,
  ],
})
export class AlertComponent {
  constructor(public alertService: AlertService) {}
}
