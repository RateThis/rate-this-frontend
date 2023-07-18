export interface Movie {
    id: number,
    title: string,
    desc: string,
    lang: string,
    genres: number[],
    score: number,
    date: Date,
    poster: string,
    votes: number,
    adult: boolean
}