import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CaseFile} from '../../pages/patient-case/create-patient-case/create-patient-case';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-file-card',
  imports: [
    DecimalPipe
  ],
  templateUrl: './file-card.html',
  styleUrl: './file-card.scss',
  standalone: true
})
export class FileCard {

  @Input() file!: CaseFile;
  @Input() showRemoveBtn: boolean = false;
  @Output() onClickRemove = new EventEmitter<void>();

  public remove(): void {
    this.onClickRemove.emit();
  }
}
