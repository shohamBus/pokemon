/* eslint-disable @typescript-eslint/no-explicit-any */
 export interface Pokemon {
    abilities: Array<{ [key: string]: any }>;
    base_experience: number;
    cries: {
      latest: string;
      legacy: string | null;
    };
    forms: Array<{ [key: string]: any }>;
    game_indices: Array<{ [key: string]: any }>;
    height: string;
    held_items: Array<{ [key: string]: any }>;
    id: number;
    imgSrc: string;
    is_default: boolean;
    location_area_encounters: string;
    moves: Array<{ [key: string]: any }>;
    name: string;
    order: number;
    paddedId: string;
    past_abilities: Array<{ [key: string]: any }>;
    past_types: Array<{ [key: string]: any }>;
    species: {
      name: string;
      url: string;
    };
    sprites: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string;
      [key: string]: any;
    };
    stats: Array<{ [key: string]: any }>;
    types: Array<{ [key: string]: any }>;
    weight: string;
  }