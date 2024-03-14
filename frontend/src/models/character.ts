export type Character = {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string; 
  gender: string;
  origin?: {
    name: string;
    url: string;
  }; 
  image: string
}

export type Info = {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
}

export type GetCharactersResponse = {
  info: Info;
  characters: Character[];
}