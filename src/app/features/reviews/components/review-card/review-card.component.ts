import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Review } from 'src/app/models/review';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
})
export class ReviewCardComponent implements OnInit {
  @Input({ required: true }) review!: Review;
  public userInfo$?: Observable<any>;

  constructor(private _userService: UserService) {}

  public ngOnInit(): void {
    this.userInfo$ = this._userService.getUserInfo$(this.review.userId);
  }
}
