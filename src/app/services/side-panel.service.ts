import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidePanelService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();
  private autoCloseTimer: any;

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
  }

  close() {
    this.isOpenSubject.next(false);
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
  }

  open(autoClose = false) {
    this.isOpenSubject.next(true);
    if (autoClose) {
      if (this.autoCloseTimer) {
        clearTimeout(this.autoCloseTimer);
      }
      this.autoCloseTimer = setTimeout(() => {
        this.close();
      }, 5000);
    }
  }
}
