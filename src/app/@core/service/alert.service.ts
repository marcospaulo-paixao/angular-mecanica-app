import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {AlertMessageOptions} from "../api";

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private messageSource = new Subject<AlertMessageOptions | AlertMessageOptions[]>(); // Alteração: agora emitimos listagem de alertas
  private clearSource = new Subject<string | null>(); // Usado para limpar alertas específicos

  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();

  constructor() {}

  /**
   * Adiciona e exibe um novo alerta
   */
  add(message: AlertMessageOptions): void {
    this.messageSource.next(message);
  }
}
