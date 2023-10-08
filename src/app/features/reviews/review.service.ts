import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

import { Globals } from 'src/app/globals';
import { Review, EntityType, Entity, ReviewHttp } from 'src/app/models/review';

@Injectable({
  providedIn: 'any',
})
export class ReviewService {
  private _endPoint!: string;
  private _entitySource = new BehaviorSubject<Entity>({
    id: '-1',
    type: 'movie',
  });
  private _userReviewSource = new BehaviorSubject<Review | null>(null);
  public userReview$: Observable<Review | null> =
    this._userReviewSource.asObservable();

  constructor(private _globals: Globals, private _http: HttpClient) {
    this._endPoint = `${this._globals.API_URL}/review`;
  }

  public updateUserReview(review: Review | null): void {
    this._userReviewSource.next(review);
  }

  public updateEntity(entity: Entity): void {
    this._entitySource.next(entity);
  }

  private get _entity(): Entity {
    return this._entitySource.getValue();
  }

  public getUserReview$(): Observable<Review | null> {
    const { id, type } = this._entity;
    return this._http
      .get<ReviewHttp>(`${this._endPoint}/${type}/${id}`, {
        withCredentials: true,
      })
      .pipe(map((res) => this._transformReview(res)));
  }

  public createReview$(data: Object): Observable<Review | null> {
    const { id, type } = this._entity;
    return this._http
      .post<ReviewHttp>(`${this._endPoint}/${type}/${id}`, data, {
        withCredentials: true,
      })
      .pipe(map((res) => this._transformReview(res)), );
  }

  public patchReviewById$(data: Object, id: number): Observable<Review | null> {
    return this._http
      .patch<ReviewHttp>(`${this._endPoint}/${id}`, data, {
        withCredentials: true,
      })
      .pipe(map((res) => this._transformReview(res)));
  }

  public deleteReviewById$(id: number): Observable<Review | null> {
    return this._http
      .delete<ReviewHttp>(`${this._endPoint}/${id}`, {
        withCredentials: true,
      })
      .pipe(map(this._transformReview));
  }

  public getReviewsCount$(): Observable<any> {
    const { id, type } = this._entity;
    return this._http.get<any>(`${this._endPoint}/${type}/${id}/count`, {
      withCredentials: true,
    });
  }

  private _transformReview(review: ReviewHttp | null): Review | null {
    if (!review) return null;
    return {
      id: review.id,
      userId: review.id_user,
      uuid: review.uuid,
      entity: { id: review.id_entity, type: review.entity_type },
      rating: review.rating,
      text: review.text,
      createDate: review.create_time,
      editDate: review.last_edit_time,
    };
  }
}
