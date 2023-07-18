import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  public readonly API_URL = 'http://localhost:8080';
  public readonly API_MOVIES = {
    KEY: 'beaa23508521ca15de4970c3ce41291b',
    URL: 'https://api.themoviedb.org/3',
    IMAGE_URL: 'https://image.tmdb.org/t/p'
  }
}