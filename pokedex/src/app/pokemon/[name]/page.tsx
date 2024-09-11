import React from "react";
import { getPokemon } from "../../../services/pokeapi";

interface PokemonDetailProps {
  params: {
    name: string;
  };
}

const typeColors: Record<string, string> = {
  grass: "bg-grass",
  fire: "bg-fire",
  water: "bg-water",
  bug: "bg-bug",
  normal: "bg-normal",
  electric: "bg-electric",
  ground: "bg-ground",
  fairy: "bg-fairy",
  poison: "bg-poison",
  fighting: "bg-fighting",
  flying: "bg-flying",
  psychic: "bg-psychic",
  rock: "bg-rock",
  ice: "bg-ice",
  dragon: "bg-dragon",
  dark: "bg-darkPokemon",
  steel: "bg-steel",
  ghost: "bg-ghost",
};

const PokemonDetail = async ({ params }: PokemonDetailProps) => {
  const pokemon = await getPokemon(params.name);
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  // Determine the background color based on the first Pokémon type
  const bgColor = typeColors[pokemon.types[0].type.name] || "bg-white";

  return (
    <div className={`${bgColor}`}>
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <button className="text-white">←</button>
        <h1 className="text-white text-xl font-bold">{pokemon.name}</h1>
        <span className="text-white">#{pokemon.id}</span>
      </div>
      <div className="pokemonImg flex justify-center text-center">
        <img
          className="w-50 h-auto"
          src={imgUrl}
          alt={pokemon.name}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-center space-x-2">
          {pokemon.types.map((typeInfo: { type: { name: string } }) => (
            <span
              key={typeInfo.type.name}
              className={`bg-${typeInfo.type.name} text-white px-2 py-1 rounded`}
            >
              {typeInfo.type.name.charAt(0).toUpperCase() +
                typeInfo.type.name.slice(1)}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold">About</h2>
          <p>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} is a{" "}
            {pokemon.types
              .map((typeInfo: { type: { name: string } }) => typeInfo.type.name)
              .join("/")}{" "}
            type Pokémon.
          </p>
          <ul className="mt-2">
            <li>Weight: {pokemon.weight / 10} kg</li>
            <li>Height: {pokemon.height / 10} meters</li>
            <li>
              Abilities:{" "}
              {pokemon.abilities
                .map(
                  (abilityInfo: { ability: { name: string } }) =>
                    abilityInfo.ability.name
                )
                .join(", ")}
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold">Pokémon Data</h2>
          <ul>
            <li>
              HP:{" "}
              {
                pokemon.stats.find(
                  (stat: { stat: { name: string } }) => stat.stat.name === "hp"
                )?.base_stat
              }
            </li>
            <li>
              ATK:{" "}
              {
                pokemon.stats.find(
                  (stat: { stat: { name: string } }) =>
                    stat.stat.name === "attack"
                )?.base_stat
              }
            </li>
            <li>
              DEF:{" "}
              {
                pokemon.stats.find(
                  (stat: { stat: { name: string } }) =>
                    stat.stat.name === "defense"
                )?.base_stat
              }
            </li>
            <li>
              SATK:{" "}
              {
                pokemon.stats.find(
                  (stat: { stat: { name: string } }) =>
                    stat.stat.name === "special-attack"
                )?.base_stat
              }
            </li>
            <li>
              SDEF:{" "}
              {
                pokemon.stats.find(
                  (stat: { stat: { name: string } }) =>
                    stat.stat.name === "special-defense"
                )?.base_stat
              }
            </li>
            <li>
              SPD:{" "}
              {
                pokemon.stats.find(
                  (stat: { stat: { name: string } }) =>
                    stat.stat.name === "speed"
                )?.base_stat
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
