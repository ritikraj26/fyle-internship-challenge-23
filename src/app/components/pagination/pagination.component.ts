import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() totalPages: number = 1;
  @Input() pages: number[] = [];
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeItemsPerPage: EventEmitter<number> = new EventEmitter<number>();

  triggerPageChange(newPage: number): void {
    this.onPageChange.emit(newPage);
  }

  triggerItemsPerPageChange(event: Event): void {
    const newItemsPerPage = (event.target as HTMLSelectElement).value;
    this.changeItemsPerPage.emit(Number(newItemsPerPage));
  }
}
