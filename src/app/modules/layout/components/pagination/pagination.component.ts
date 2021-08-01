import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() perPage: number = 1;
  @Input() total: number = 1;
  @Input() lastPage: number = 1;
  @Output() loadPage = new EventEmitter();
  @Output() changePerPage = new EventEmitter();

  constructor() {
  }

  pager(page: number) {
    console.log("page in servicess---",page,this.total,this.currentPage);
    if (page > 0 && page <= this.total && page != this.currentPage) {
       console.log("check if condition work")
      this.loadPage.emit(+page);
    }
  }

  changePerPageSelection(value: number) {
    console.log("this in sercei page change per page",value);
    this.changePerPage.emit(+value);
  }
}
