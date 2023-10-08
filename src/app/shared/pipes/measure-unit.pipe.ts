import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measureUnit'
})
export class MeasureUnitPipe implements PipeTransform {

  public transform(value: number): string {
    const millions = Math.round(value / 1_000_000);
    if (millions > 0) return `${millions} mln`;
    const thousands = Math.round(value / 1_000);
    if (thousands > 10) return `${thousands} k`;
    return value+'';
  }

}
