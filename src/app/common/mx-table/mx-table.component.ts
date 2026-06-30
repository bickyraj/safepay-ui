import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgClass} from '@angular/common';

export interface PaginationDetails {
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  hasNext: boolean;
}

@Component({
  selector: 'app-mx-table',
  templateUrl: './mx-table.component.html',
  standalone: true,
  imports: [
    NgClass
  ],
  styleUrl: './mx-table.component.css'
})
export class MxTableComponent<T extends { id: number | string }> implements OnChanges {
  @Input() dataList: T[] = [];
  @Output() pageChange = new EventEmitter<number>();
  @Input() columns: (keyof Partial<T>)[] = [];
  public pages: (number | string) [] = [];
  private readonly maxPagesToShow = 2;

  @Input()
  public paginationDetails: PaginationDetails = {
    pageNumber: 0,
    totalPages: 0,
    pageSize:100,
    totalElements: 0,
    hasNext: false
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataList']) {
      this.pages = [];
      for (let i = 0; i < this.paginationDetails.totalPages; i++) {
        if (i < this.maxPagesToShow || i >= this.paginationDetails.totalElements - this.maxPagesToShow || Math.abs(i - this.paginationDetails.pageNumber) <= 1) {
          this.pages.push(i + 1);
        } else if (this.pages[this.pages.length - 1] !== '...') {
          this.pages.push('...');
        }
      }
    }
  }

  public paginate(page: number): void {
    this.pageChange.emit(page);
  }

  public onChangePageSize(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = Number(target.value);
    if (newSize !== this.paginationDetails.pageSize) {
      this.paginationDetails.pageSize = newSize;
      this.paginate(this.paginationDetails.pageNumber);
    }
  }

  public trackByItemId(index: number, item: T): number | string {
    return item.id;
  }

  public pageIsNumber(page: number | string): page is number {
    return typeof page === 'number';
  }
}
