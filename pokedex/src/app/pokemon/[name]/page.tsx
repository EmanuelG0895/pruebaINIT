"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getPokemon } from "../../../services/pokeapi";

interface Pokemon {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  weight: number;
  height: number;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ stat: { name: string }; base_stat: number }>;
}

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

const capitalizeName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

const PokemonDetail = ({ params }: PokemonDetailProps) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemon(params.name);
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();
  }, [params.name]);

  if (!pokemon) return <div>Loading...</div>;

  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const bgColor = typeColors[pokemon.types[0].type.name] || "bg-white";
  const typeNames = pokemon.types
    .map((typeInfo) => capitalizeName(typeInfo.type.name))
    .join("/");

  return (
    <div className={`${bgColor} h-screen relative`}>
      <div
        className="
        absolute
        top-10
        right-0  
        sm:top-0 
        sm:right-0 
        md:right-4
        md:top-4
        z-10"
      >
        <img
          className="h-80 sm:h-96 md:h-96"
          src="/BgPokeball.svg"
          alt="Pokeball Background"
          style={{ opacity: 0.2 }}
        />
      </div>

      <div className="relative z-20">
        <div className="flex items-center justify-between p-4">
          <button className="text-white">←</button>
          <h1 className="text-white text-xl font-bold">
            {capitalizeName(pokemon.name)}
          </h1>
          <span className="text-white">#{pokemon.id}</span>
        </div>
        <div className="pokemonImg flex justify-center text-center">
          <img
            className="sm:h-96 md:h-96"
            src={imgUrl}
            alt={`Artwork of ${pokemon.name}`}
          />
        </div>
        <div className="p-4 bg-white rounded-xl shadow-custom-inner-shadow">
          <div className="flex justify-center space-x-2">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`bg-${typeInfo.type.name} text-white px-2 py-1 rounded`}
              >
                {capitalizeName(typeInfo.type.name)}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold">About</h2>
            <p>
              {capitalizeName(pokemon.name)} is a {typeNames} type Pokémon.
            </p>
            <ul className="mt-2">
              <li>Weight: {pokemon.weight / 10} kg</li>
              <li>Height: {pokemon.height / 10} meters</li>
              <li>
                Abilities:{" "}
                {pokemon.abilities
                  .map((abilityInfo) =>
                    capitalizeName(abilityInfo.ability.name)
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
                  pokemon.stats.find((stat) => stat.stat.name === "hp")
                    ?.base_stat
                }
              </li>
              <li>
                ATK:{" "}
                {
                  pokemon.stats.find((stat) => stat.stat.name === "attack")
                    ?.base_stat
                }
              </li>
              <li>
                DEF:{" "}
                {
                  pokemon.stats.find((stat) => stat.stat.name === "defense")
                    ?.base_stat
                }
              </li>
              <li>
                SATK:{" "}
                {
                  pokemon.stats.find(
                    (stat) => stat.stat.name === "special-attack"
                  )?.base_stat
                }
              </li>
              <li>
                SDEF:{" "}
                {
                  pokemon.stats.find(
                    (stat) => stat.stat.name === "special-defense"
                  )?.base_stat
                }
              </li>
              <li>
                SPD:{" "}
                {
                  pokemon.stats.find((stat) => stat.stat.name === "speed")
                    ?.base_stat
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
