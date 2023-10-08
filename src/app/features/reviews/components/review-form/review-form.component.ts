import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Review } from 'src/app/models/review';

import { ReviewService } from 'src/app/features/reviews/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input('userReview') review: Review | null = null;
  public form!: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _reviewService: ReviewService
  ) {}

  public ngOnChanges(): void {
    this.form?.get('text')?.patchValue(this.review?.text || '');
  }

  public ngOnInit(): void {
    this.form = this._createForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(): void {
    if (this.form.invalid) return;
    const text = this.form.get('text')?.value;
    if (text === this.review?.text) return;
    if (this.review) {
      if (this.review.text) {
        this._reviewService
          .patchReviewById$({ text }, this.review.id)
          .pipe(takeUntil(this._destroy$))
          .subscribe((review) => {
            this.review = review;
            this._reviewService.updateUserReview(this.review);
          });
      } else {
        this._reviewService
          .patchReviewById$({ text, create_time: Date.now() }, this.review.id)
          .pipe(takeUntil(this._destroy$))
          .subscribe((review) => {
            this.review = review;
            this._reviewService.updateUserReview(this.review);
          });
      }
    }
  }

  public updateRating(rating: number): void {
    if (rating < 0 || rating > 20) return;
    if (this.review) {
      if (rating === 0) {
        this._reviewService
          .deleteReviewById$(this.review.id)
          .pipe(takeUntil(this._destroy$))
          .subscribe((_) => {
            this.review = null;
            this._reviewService.updateUserReview(null);
          });
      } else {
        this._reviewService
          .patchReviewById$({ rating }, this.review.id)
          .pipe(takeUntil(this._destroy$))
          .subscribe((review) => {
            this.review = review;
            this._reviewService.updateUserReview(review);
          });
      }
    } else {
      this._reviewService
        .createReview$({ rating })
        .pipe(takeUntil(this._destroy$))
        .subscribe((review) => {
          this.review = review;
          this._reviewService.updateUserReview(review);
        });
    }
  }

  private _createForm(): FormGroup {
    return this._fb.group({
      text: [this.review, [Validators.required]],
    });
  }
}
