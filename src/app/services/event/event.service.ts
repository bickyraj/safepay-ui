import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {NotificationModel} from '../../model/NotificationModel';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private notificationSubject = new Subject<NotificationModel>();
  notification$ = this.notificationSubject.asObservable();

  emit(notification: NotificationModel) {
    this.notificationSubject.next(notification);
  }
}
