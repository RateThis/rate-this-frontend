import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gradient-arrow',
  templateUrl: './gradient-arrow.component.html',
  styleUrls: ['./gradient-arrow.component.scss']
})
export class GradientArrowComponent {
  @Input() reversed: boolean = false;
}
