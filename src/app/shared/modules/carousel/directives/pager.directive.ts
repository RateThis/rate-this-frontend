import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[pager]'
})
export class PagerDirective implements OnChanges, AfterViewInit {
  @Input('pager') page!: number;
  @Input('pageSize') pageSize: number = 5;
  private _elements!: HTMLElement[];

  constructor(private _el: ElementRef, private _renderer: Renderer2) { }

  public ngAfterViewInit(): void {
    this._elements = Array.from(this._el.nativeElement.children);
    this._switchPageView();
  }

  public ngOnChanges(): void {
    this._switchPageView();
  }

  private _switchPageView(): void {
    if (!this._elements) return;
    const startIdx = (this.page - 1) * this.pageSize;
    const endIdx = startIdx + this.pageSize - 1;
    this._elements.forEach((element, idx) => {
      this._renderer.removeClass(element, "hidden");
      if (idx < startIdx || idx > endIdx) {
        this._renderer.addClass(element, "hidden");
      }
    });
    if (endIdx >= this._elements.length) {
      this._elements.slice(-this.pageSize).map((element) => {
        this._renderer.removeClass(element, "hidden");
      });
    }
  }
}
