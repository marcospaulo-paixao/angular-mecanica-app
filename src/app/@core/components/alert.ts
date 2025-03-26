import {AfterViewInit, Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {AlertCloseEvent, AlertMessageOptions} from '../api';
import {AlertService} from "../service/alert.service";

@Component({
  selector: 'app-alert-item',
  template: `
    <div [@alertState] [class]="'alert alert-' + message?.severity + ' alert-dismissible fade show'" role="alert"
         (click)="onCloseHandle()">
      <div>
        <ng-container *ngIf="message?.severity === 'success'">
          <i class="me-2 fa fa-check-circle"></i>
        </ng-container>
        <ng-container *ngIf="message?.severity === 'warning'">
          <i class="me-2 fa fa-info-circle"></i>
        </ng-container>
        <ng-container *ngIf="message?.severity === 'danger'">
          <i class="me-2 fa fa-times-circle"></i>
        </ng-container>
        <ng-container *ngIf="message?.severity === 'info'">
          <i class="me-2 fa fa-exclamation-circle"></i>
        </ng-container>
        <ng-container *ngIf="message?.severity === 'primary'">
          <i class="me-2 fa fa-info-circle"></i>
        </ng-container>
        <strong>{{ message?.summary }}</strong> <br>
        <span [class]="getColorText()">{{ message?.detail }}</span>
      </div>
    </div>`,
  styles: [
    `
      .alert {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        border-radius: 4px;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
        opacity: 0.8 !important;
        transform: translateY(0);
      }
    `,
  ],
  animations: [
    trigger('alertState', [
      // Definição de estado para transição "void => *"
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(50%)',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('void => *', [animate('300ms ease-out')]),
      transition('* => void', [
        animate(
          '250ms ease-in',
          style({
            opacity: 0,
            transform: 'translateY(-50%)',
          })
        ),
      ]),
    ]),
  ],
})
export class AlertItem implements AfterViewInit, OnDestroy {

  @Input() message: AlertMessageOptions | null | undefined;
  @Input() index: number | null | undefined;
  @Output() onClose: EventEmitter<AlertCloseEvent> = new EventEmitter();
  timeout: any

  constructor(private zone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.initTimeout();
  }

  initTimeout() {
    this.zone.run(() => {
      this.timeout = setTimeout(
        () => {
          this.onCloseHandle();
        },
        this.message?.life || 3000
      );
    });
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  getColorText() {
    return document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'text-white' : 'text-black';
  }

  onCloseHandle() {
    this.onClose.emit({
      index: this.index!,
      message: <AlertMessageOptions>this.message
    });
  }
}


@Component({
  selector: 'app-alert',
  template: `
    <div class="alert-container">
      <div *ngFor="let message of messages; let i = index">
        <app-alert-item [message]="message" [index]="i" (onClose)="onMessageClose($event)"></app-alert-item>
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
    `,
  ],
  animations: [
    trigger('alertState', [
      // Definição de estado para transição "void => *"
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(50%)',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('void => *', [animate('300ms ease-out')]),
      transition('* => void', [
        animate(
          '250ms ease-in',
          style({
            opacity: 0,
            transform: 'translateY(-50%)',
          })
        ),
      ]),
    ]),
  ],
})
export class Alert implements OnInit, OnDestroy {
  private messageSubscription: Subscription | undefined;
  private clearSubscription: Subscription | undefined;
  messages: AlertMessageOptions[] | null | undefined;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.messageSubscription = this.alertService.messageObserver.subscribe((messages) => {
      if (messages) {
        if (Array.isArray(messages)) {
          this.add(messages);
        } else {
          this.add([messages]);
        }
      }
    });

    this.clearSubscription = this.alertService.clearObserver.subscribe(() => {
      this.messages = null;
    });
  }

  add(messages: AlertMessageOptions[]): void {
    this.messages = this.messages ? [...this.messages, ...messages] : [...messages];
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    if (this.clearSubscription) {
      this.clearSubscription.unsubscribe();
    }
  }

  onMessageClose(event: AlertCloseEvent) {
    this.messages?.splice(event.index, 1);
  }
}
