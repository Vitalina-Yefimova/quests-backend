export interface CreateQuest {
  title: string;
  description: string;
  genres: { genreName: string }[];
  difficulty: string;
  duration: string;
  price: number;
  image: string;
  imageBg: string;
} 