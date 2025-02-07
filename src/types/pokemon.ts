export interface Pokemon {
  key: string;
  sprite: string;
  num: number;
  species: string;
  color: string;
  types: string[];
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialattack: number;
    specialdefense: number;
    speed: number;
  };
  height: number;
  weight: number;
  flavorTexts: {
    flavor: string;
    game: string;
  }[];
}