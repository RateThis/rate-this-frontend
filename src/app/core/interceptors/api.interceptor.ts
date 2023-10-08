import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Globals } from 'src/app/globals';
import { EntityType } from 'src/app/models/review';

const API_TYPE = new HttpContextToken<EntityType | 'none'>(() => 'none');

export function apiContext(context: EntityType | 'none' = 'none'): HttpContext {
  return new HttpContext().set(API_TYPE, context);
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  
  constructor(private _globals: Globals) {}

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiType = req.context.get(API_TYPE);
    if (apiType === 'movie') {
      const url = `${req.url}?api_key=${this._globals.API_MOVIES.KEY}`;
      return next.handle(req.clone({ url }));
    }
    return next.handle(req);
  }
}
