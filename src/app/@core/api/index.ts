export interface AlertMessageOptions {
  key?: string;
  severity?: 'success'| 'warning'| 'danger'| 'info'| 'primary';
  summary?: string;
  detail?: string;
  life?: number;
}

export interface AlertCloseEvent {
  index: number,
  message: AlertMessageOptions;
}
