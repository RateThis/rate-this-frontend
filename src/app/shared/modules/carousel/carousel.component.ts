import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input('pageSize') maxElemsPerSLide: number = 5;
  @Input('size') elemsNum: number = 0;
  public currentPage: number = 1;
  public maxPages?: number;

  constructor() { }

  public ngOnInit(): void {
    this.maxPages = Math.ceil(this.elemsNum / this.maxElemsPerSLide);
  }

  public updateCurrentPage(reverse: boolean = true): void {
    const page = this.currentPage + (reverse ? 1 : -1);
    if (this.maxPages && 1 <= page && page <= this.maxPages) this.currentPage = page;
  }
}
