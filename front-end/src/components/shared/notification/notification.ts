import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../app/services/notification';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  notificationService = inject(NotificationService);
  public note = this.notificationService.notification$();

}
