import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-widget',
  templateUrl: './score-widget.component.html',
  styleUrls: ['./score-widget.component.scss']
})
export class ScoreWidgetComponent {
  @Input() score!: number | string;
  @Input() displayStar: boolean = true;
}
