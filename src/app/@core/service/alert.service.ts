import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {AlertMessageOptions} from "../api";

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private messageSource = new Subject<AlertMessageOptions | AlertMessageOptions[]>(); // Alteração: agora emitimos listagem de alertas
  private clearSource = new Subject<string | null>(); // Usado para limpar alertas específicos
  private alerts: AlertMessageOptions[] = []; // Estado interno contendo lista de alertas

  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();

  constructor() {}

  /**
   * Adiciona e exibe um novo alerta
   */
  add(message: AlertMessageOptions): void {
    this.messageSource.next(message);
  }

  /**
   * Limpa um alerta específico ou todos os alertas
   */
  clear(key?: string): void {
    this.clearSource.next(key || null);
  }
}
