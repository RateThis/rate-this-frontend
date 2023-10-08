import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea[autoHeight]'
})
export class AutoHeightDirective implements AfterViewInit {
  @HostListener('input', ['$event.target'])
  public onKeyUp(textArea: HTMLTextAreaElement): void {
    textArea.style.height = "0px";
    textArea.style.height = (textArea.scrollHeight) + "px";
  }

  constructor(private _el: ElementRef) { }

  public ngAfterViewInit(): void {
    this.onKeyUp(this._el.nativeElement);
  }
}
