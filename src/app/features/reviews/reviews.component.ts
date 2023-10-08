import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  map,
  of,
  share,
  takeUntil,
} from 'rxjs';
import { Entity, Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/features/reviews/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input({ required: true }) entity!: Entity;
  public userReview$?: Observable<Review | null>;
  public reviewsCount$?: Observable<number>;
  private _destroy$ = new Subject<void>();

  constructor(private _reviewService: ReviewService) {}

  public ngOnInit(): void {
    this._reviewService
      .getUserReview$()
      .pipe(takeUntil(this._destroy$))
      .subscribe((review) => {
        this._reviewService.updateUserReview(review);
      });

    this._reviewService.updateEntity(this.entity);

    this.userReview$ = this._getUserReview$();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getUserReview$(): Observable<Review | null> {
    return this._reviewService.userReview$.pipe(
      takeUntil(this._destroy$),
      catchError((err) => of(null)),
      share()
    );
  }
}
