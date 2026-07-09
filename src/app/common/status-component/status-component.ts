import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-status-component',
  imports: [
    NgClass
  ],
  templateUrl: './status-component.html',
  styleUrl: './status-component.scss',
  standalone: true
})
export class StatusComponent {
  @Input() value: string | null | undefined;

  get displayValue(): string {
    return this.value ? this.value.charAt(0) + this.value.slice(1).toLowerCase() : '—';
  }

  get statusClass(): string {
    switch (this.value?.toUpperCase()) {
      case 'DRAFT':
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';

      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800 ring-blue-600/20';

      case 'FINAL':
        return 'bg-green-100 text-green-800 ring-green-600/20';

      case 'REJECTED':
        return 'bg-red-100 text-red-800 ring-red-600/20';

      default:
        return 'bg-gray-100 text-gray-800 ring-gray-600/20';
    }
  }

  get statusDotClass(): Record<string, boolean> {
    const v = this.value?.toUpperCase();
    return {
      'bg-yellow-500': v === 'DRAFT' || v === 'PENDING',
      'bg-blue-500': v === 'SUBMITTED',
      'bg-green-500': v === 'FINAL',
      'bg-red-500': v === 'REJECTED',
      'bg-gray-500': !v,
    };
  }
}
