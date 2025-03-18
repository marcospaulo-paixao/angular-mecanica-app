import {Injectable} from '@angular/core';

export enum AlertType {
  SUCCESS = 'alert-success',
  WARNING = 'alert-warning',
  DANGER = 'alert-danger',
  INFO = 'alert-info',
  PRIMARY = 'alert-primary',
}

export interface AlertProps {
  description: string;
  type: AlertType;
  delay: number;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public alerts: AlertProps[] = [];

  constructor() {
  }

  /**
   * Adiciona e exibe um novo alert
   */
  show(props: AlertProps): void {
    this.alerts.push(props);

    // Remove o alert automaticamente após o delay (se especificado)
    if (props.delay) {
      setTimeout(() => this.removeAlert(props), props.delay);
    }
  }

  /**
   * Remove um alert específico
   */
  private removeAlert(alert: AlertProps): void {
    const index = this.alerts.indexOf(alert);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
  }
}
