const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export interface Pokemon {
    name: string;
    url: string;
}

export const getPokemons = async (limit: number = 10, offset: number = 0) => {
    const response = await fetch(`${POKEAPI_BASE_URL}?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
};

export const getPokemon = async (name: string) => {
    const response = await fetch(`${POKEAPI_BASE_URL}/${name}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
};

export const searchPokemons = async (term: string) => {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}?limit=10000`); // Obtener todos los Pokémon (puedes ajustar el límite)
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const allPokemons = data.results;
        const filtered = allPokemons.filter((pokemon: Pokemon) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return (
                pokemon.name.toLowerCase().includes(term.toLowerCase()) ||
                id.includes(term)
            );
        });
        return filtered;
    } catch (error) {
        console.error('Failed to search Pokémon:', error);
        return [];
    }
};
