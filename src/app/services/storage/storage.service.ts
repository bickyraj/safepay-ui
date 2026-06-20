import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {GlobalStorage} from './GlobalStorage.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
  private storage = new Map<string, BehaviorSubject<any>>();
  private subscriptions = new Map<string, Subscription>();

  constructor() {
    this.init();
  }

  private init(): void {
    const enumKeys = Object.values(GlobalStorage);

    enumKeys.forEach(key => {
      try {
        const saved = localStorage.getItem(key);
        const value = saved ? JSON.parse(saved) : null;

        if (!this.storage.has(key)) {
          this.addSubscription(key, value);
        }
      } catch (e) {
        console.error(`Error parsing localStorage key "${key}"`, e);
      }
    });
  }

  private addSubscription<T>(key: GlobalStorage | string, value: T): void {
    const subject = new BehaviorSubject<T>(value);
    this.storage.set(key, subject);
    const sub = subject.subscribe(val => {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {
        console.error(`Error saving ${key} to localStorage`, e);
      }
    });
    this.subscriptions.set(key, sub);
  }

  get<T>(key: string): BehaviorSubject<T> | undefined {
    return this.storage.get(key);
  }

  set<T>(key: GlobalStorage | string, value: T): void {
    let subject = this.storage.get(key);
    if (subject) {
      subject.next(value);
    } else {
      this.addSubscription(key, value);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.clear();
    this.storage.clear();
  }
}
