import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  public sidebarSizeSubject = new BehaviorSubject<{ width: number; height: number } | null>(null);

  updateSidebarSize(size: { width: number; height: number }) {
    this.sidebarSizeSubject.next(size);
  }
}
