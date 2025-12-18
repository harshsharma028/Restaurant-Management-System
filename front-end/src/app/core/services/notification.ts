import { Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // optional signal (for future state/debug)
  lastMessage = signal<string | null>(null);

  constructor(private messageService: MessageService) { }

  success(message: string, title = 'Success') {
    this.show('success', title, message);
  }

  error(message: string, title = 'Error') {
    this.show('error', title, message);
  }

  info(message: string, title = 'Info') {
    this.show('info', title, message);
  }

  warn(message: string, title = 'Warning') {
    this.show('warn', title, message);
  }

  default(message: string, title = 'Message') {
    this.show('secondary', title, message);
  }

  private show(severity: any, summary: string, detail: string) {
    this.lastMessage.set(detail);

    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000
    });
  }
}
