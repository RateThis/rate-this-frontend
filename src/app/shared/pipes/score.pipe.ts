import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  public transform(score: number): string {
    if (score === 0) return 'N/A';
    return score.toFixed(1).replace('.0', '') + '/10';
  }

}
