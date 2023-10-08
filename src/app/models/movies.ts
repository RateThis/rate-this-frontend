export interface Movie {
  id: number;
  title: string;
  lang: string;
  score: number;
  date: Date;
  poster: string;
  adult: boolean;
}

export interface MovieInfo extends Movie {
  desc: string;
  genres: string[];
  votes: number;
  backdrop: string;
  original: string;
  time: Date;
  budget: number;
  revenue: number;
}

export enum MoviesCollectionType {
  Top = 'top_rated',
  Now = 'now_playing',
  Popular = 'popular',
}
