import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-rate-widget',
  templateUrl: './rate-widget.component.html',
  styleUrls: ['./rate-widget.component.scss'],
})
export class RateWidgetComponent implements OnChanges {
  @ViewChildren('star') starElems?: QueryList<ElementRef>;
  @Input() rating: number = 0;
  @Output() newRatingEvent = new EventEmitter<number>();

  constructor(private _renderer: Renderer2) {}

  public ngOnChanges(): void {
    this._setStarsStyle(this.rating);
  }

  public setArrayFromNumber(number: number): any[] {
    return new Array(number);
  }

  public onMouseEnter(number: number): void {
    this._setStarsStyle(number);
  }

  public onMouseLeave(): void {
    this._setStarsStyle(this.rating);
  }

  public onClick(newRating: number): void {
    if (this.rating === newRating) return;
    this.rating = newRating;
    this.newRatingEvent.emit(this.rating);
  }

  public onResetClick(): void {
    this._setStarsStyle(0);
    this.onClick(0);
  }

  private _setStarsStyle(rating: number): void {
    this.starElems?.toArray().forEach((el: ElementRef, idx: number) => {
      const i = (idx + 1) * 2;
      el = el.nativeElement;
      if (i <= rating) {
        this._renderer.removeClass(el, 'fa-regular');
        this._renderer.removeClass(el, 'fa-star-half-stroke');
        this._renderer.addClass(el, 'fa-solid');
      } else {
        if (i - 1 == rating) {
          this._renderer.addClass(el, 'fa-star-half-stroke');
        } else {
          this._renderer.removeClass(el, 'fa-solid');
          this._renderer.removeClass(el, 'fa-star-half-stroke');
          this._renderer.addClass(el, 'fa-regular');
        }
      }
    });
  }
}
