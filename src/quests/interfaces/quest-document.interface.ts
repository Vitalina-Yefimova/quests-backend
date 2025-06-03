import { Document } from 'mongoose'; // Document - это интерфейс, который определяет типы данных для документов в MongoDB

export interface QuestDocument extends Document {
  title: string;
  description: string;
  genres: { genreName: string }[];
  difficulty: string;
  duration: string;
  price: number;
  image: string;
  imageBg: string;
}