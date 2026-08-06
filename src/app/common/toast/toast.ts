import {Component, Input, OnInit, signal} from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {NotificationModel} from '../../model/NotificationModel';
import {NotificationTypeEnum} from '../../utils/NotificationTypeEnum';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  standalone: true
})
export class Toast implements OnInit{
  public showToast = signal<boolean>(false);
  public notification!: NotificationModel | undefined;
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.notification$.subscribe((data) => {
      this.showToast.set(true);
      this.notification = data;
      setTimeout(() => {
        this.showToast.set(false);
      }, 3000);
    });
  }

  protected readonly Notification = Notification;
  protected readonly NotificationTypeEnum = NotificationTypeEnum;
}
