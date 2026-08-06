import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {NotificationModel} from '../../model/NotificationModel';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private notificationSubject = new Subject<NotificationModel>();
  notification$ = this.notificationSubject.asObservable();

  emitNotification(notification: NotificationModel) {
    this.notificationSubject.next(notification);
  }
}
