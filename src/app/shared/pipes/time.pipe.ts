import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  public transform(minutes: number): string {
    const m: number = minutes % 60;
    const h: number = (minutes - m) / 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  }

}
