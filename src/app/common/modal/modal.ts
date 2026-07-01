import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  standalone: true
})
export class Modal {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() isOpenChange = new EventEmitter<boolean>();

  public closeModal(): void {
    this.isOpenChange.emit(false);
  }
}
