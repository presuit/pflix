const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p";

export enum IMG_SIZES {
  normal = "w500",
  poster = "original",
}

export interface IMedia {
  page: number;
  results: IMediaDetail[];
  total_pages: number;
  total_results: number;
}

export interface IMediaDetail {
  adult: boolean;
  backdrop_path: string;
  genre_ids: object;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}

interface IMediaDetailGenres {
  id: number;
  name: string;
}

export interface IMediaDetailProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: IMediaDetailGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}
export type SliderDirection = "left" | "right";

export const getMovieLatest = async () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  ).then((res) => res.json());

export const getMovieTop = async () =>
  fetch(
    `${BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

export const getMovieUpcoming = async () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

export const getImgURL = (path: string, sizeOption: IMG_SIZES) =>
  `${IMG_URL}/${sizeOption}/${path}`;

export const getMovieDetail = async ({ queryKey }: any) =>
  fetch(
    `${BASE_URL}/movie/${queryKey[1]}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  ).then((res) => res.json());

export const getTvLatest = async () =>
  fetch(
    `${BASE_URL}/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

export const getTvAiringToday = async () =>
  fetch(
    `${BASE_URL}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

export const getTvPopular = async () =>
  fetch(
    `${BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

export const getTvTopRated = async () =>
  fetch(
    `${BASE_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

export const getTvDetail = async ({ queryKey }: any) =>
  fetch(
    `${BASE_URL}/tv/${queryKey[1]}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  ).then((res) => res.json());

export const getMovieSearch = async ({ queryKey }: any) =>
  fetch(
    `${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${queryKey[2]}&page=1&include_adult=false`
  ).then((res) => res.json());

export const getTvSearch = async ({ queryKey }: any) =>
  fetch(
    `${BASE_URL}/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&query=${queryKey[2]}&include_adult=false`
  ).then((res) => res.json());
