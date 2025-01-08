import { logDOM } from "@testing-library/react";
import { Pokemon } from "./types";

export const getTypeIconSrc = (type:string) => `./images/types-icons/${ type }.svg`;


export const formatPokemonData = (pokemon: Pokemon) => {
    const { id, name, sprites, weight, height, types } = pokemon;
    
    const weightInKg = (weight / 10 ) + 'kg';
    const heightInMeter = (height / 10 ) + 'm';
    const paddedId = String(id).padStart(3, '0');
    const formattedTypes = types.map(({ type }) => type);
    const pokemonImg = sprites.other.dream_world.front_default || sprites.other['official-artwork'].front_default ;

    return {
        ...pokemon,
        paddedId,
        weight: weightInKg,
        imgSrc: pokemonImg,
        height: heightInMeter,
        types: formattedTypes,
        name: removeHyphens(name),
    };
}

/**
 * Formats the stats array obtained from the API into a well-structured object for easier usage.
 *
 * @param {Array} stats - The stats array obtained from the API.
 * @returns {Array} - The formatted stats array.
 */
export function formatStats(stats) {
    console.log('status',status);
    
    const statsMaxValues = {
        hp: 714,
        attack: 714,
        defense: 614,
        "special-attack": 504,
        "special-defense": 614,
        speed: 504,
    }

    const statsObject = stats.map(({ stat, base_stat }) => {
        console.log('stat',stat);
        console.log('base_stat',base_stat);

        return {
            name: removeHyphens(stat.name),
            value: base_stat,
            max: statsMaxValues[stat.name]
        }
    });

    const total = stats.reduce((total:number, { base_stat }) => total + base_stat, 0);
    
    return [
        ...statsObject,
        { name: 'total', value: total }
    ];
}

export function normalizeEvolutionChain(evolutionChain) {
    const { species, evolves_to } = evolutionChain;
    
    if(! evolves_to.length) {
        return [];
    }
    
    const evolutions = evolves_to.reduce((chain, evolution) => {
        return [
            ...chain,
            {
                current: {
                    name: species.name,
                    image: getPokemonImage(species.url),
                },
                next: {
                    name: evolution.species.name,
                    image: getPokemonImage(evolution.species.url),
                },
            },
            ...normalizeEvolutionChain(evolution)
        ];
    }, []);

    return evolutions;
}

/**
 * Retrieves the image source of a Pokémon based on provided url with id.
 * This is necessary because the evolution endpoint doesn't provide the ID of each evolved Pokémon.
 *
 * @param {string} url - The species URL or URL with the ID of the Pokémon.
 * @returns {string} - The image source of the Pokémon.
 */
const getPokemonImage = (url:string) => {
    const id = url.match(/\/(\d+)\//)[1] || 0; 
    const isPokemonHasSvg = id < 650; 

    const base = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other`;
    
    if(isPokemonHasSvg) {
        return `${ base }/dream-world/${ id }.svg`;
    }
    
    return `${ base }/official-artwork/${ id }.png`;
};

const removeHyphens = (string:string) => {
    return string.replace(/-/g, ' ');
}