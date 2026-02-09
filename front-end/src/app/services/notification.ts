import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  type: NotificationType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private readonly _notification = signal<Notification | null>(null);
  notification$ = this._notification.asReadonly();

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  warning(message: string) {
    this.show('warning', message);
  }

  info(message: string) {
    this.show('info', message);
  }

  clear() {
    this._notification.set(null);
  }

  private show(type: NotificationType, message: string) {
    this._notification.set({ type, message });

    setTimeout(() => {
      this.clear();
    }, 4000);
  }
}
