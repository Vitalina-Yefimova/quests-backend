import { Document } from 'mongoose';

export interface QuestsRequest {
  title: string;
  description: string;
  genres: { genreName: string }[];
  players: {
    min: number;
    max: number;
  };
  difficulty: string;
  duration: string;
  price: number;
  image: string;
  imageBg: string;
}

export interface QuestsResponse {
  id: string;
  title: string;
  description: string;
  genres: { genreName: string }[];
  players: {
    min: number;
    max: number;
  };
  difficulty: string;
  duration: string;
  price: number;
  image: string;
  imageBg: string;
}

export interface QuestsDocument extends Document {
  title: string;
  description: string;
  genres: { genreName: string }[];
  players: {
    min: number;
    max: number;
  };
  difficulty: string;
  duration: string;
  price: number;
  image: string;
  imageBg: string;
}
