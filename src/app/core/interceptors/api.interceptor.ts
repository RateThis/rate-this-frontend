import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Globals } from 'src/app/globals';

const API_TYPE = new HttpContextToken<string>(() => 'none');

export function apiContext(context: string = 'none'): HttpContext {
  return new HttpContext().set(API_TYPE, context);
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private _globals: Globals) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.context.get(API_TYPE) === 'movies') {
      const url = `${req.url}?api_key=${this._globals.API_MOVIES.KEY}`;
      return next.handle(req.clone({ url }));
    } 
    return next.handle(req);
  }
}
