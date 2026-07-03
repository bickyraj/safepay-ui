import {Component, Input, OnInit, signal} from '@angular/core';
import {EventService} from '../../services/event/event.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  standalone: true
})
export class Toast implements OnInit{
  public showToast = signal<boolean>(false);
  public toastMessage: string | undefined = '';
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.notification$.subscribe((data) => {
      this.showToast.set(true);
      this.toastMessage = data.message;
      setTimeout(() => {
        this.showToast.set(false);
      }, 3000);
    });
  }
}
