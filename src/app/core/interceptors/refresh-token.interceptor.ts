import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, retry, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private _maxRetries: number = 2;

  constructor(private _authService: AuthService) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(retry({ count: this._maxRetries, delay: this._shouldRetry }));
  }

  private _shouldRetry(err: HttpErrorResponse): Observable<number> {
    const isRefreshed: boolean | undefined = err.error?.refresh;
    if (err.status === 401 && isRefreshed !== undefined) {
      if (isRefreshed) return timer(0);
      this._authService.logOut();
      throw err;
    }
    throw err;
  }
}
