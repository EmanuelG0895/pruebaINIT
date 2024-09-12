"use client";
import React, { useEffect, useState } from "react";
import { getPokemon } from "../../../services/pokeapi";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  grass: "text-grass",
  fire: "text-fire",
  water: "text-water",
  bug: "text-bug",
  normal: "text-normal",
  electric: "text-electric",
  ground: "text-ground",
  fairy: "text-fairy",
  poison: "text-poison",
  fighting: "text-fighting",
  flying: "text-flying",
  psychic: "text-psychic",
  rock: "text-rock",
  ice: "text-ice",
  dragon: "text-dragon",
  dark: "text-darkPokemon",
  steel: "text-steel",
  ghost: "text-ghost",
};

const bgColors: Record<string, string> = {
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

const progressBarColors: Record<string, string> = {
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
  const router = useRouter();
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
  const bgColor = bgColors[pokemon.types[0].type.name] || "bg-white";
  const textColor = typeColors[pokemon.types[0].type.name] || "text-dark";
  const progressBarColor =
    progressBarColors[pokemon.types[0].type.name] || "bg-gray";
  const typeNames = pokemon.types
    .map((typeInfo) => capitalizeName(typeInfo.type.name))
    .join("/");

  return (
    <div className={`${bgColor} h-screen relative`}>
      <div
        className="
          absolute
          top-0
          right-0  
          sm:top-0 
          sm:right-0 
          md:right-4
          md:top-4
          z-10"
      >
        <img
          className="h-64 sm:h-64 md:h-64"
          src="/BgPokeball.svg"
          alt="Pokeball Background"
          style={{ opacity: 0.2 }}
        />
      </div>
      {/* Main content */}
      <div className={`relative z-2`}>
        <div className="flex justify-between p-4">
          <button type="button" onClick={() => router.push("/")}>
            <p className="text-white text-4xl font-bold flex">
              <Image src="/Vector.svg" alt="" width={50} height={50} />
              {capitalizeName(pokemon.name)}
            </p>
          </button>
          <span className="text-white font-bold text-4xl">#{pokemon.id}</span>
        </div>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-xl font-bold ${textColor}`}>
            {capitalizeName(pokemon.name)}
          </h1>
          <span className={`text-xl font-bold ${textColor}`}>
            #{pokemon.id}
          </span>
        </div>

        {/* Pokemon image */}
        <div className="pokemonImg flex justify-center text-center -mt-16 z-30 relative">
          <img
            className="sm:h-96 md:h-96"
            src={imgUrl}
            alt={`Artwork of ${pokemon.name}`}
          />
        </div>

        {/* Details */}
        <div className="p-4 ml-2 mr-2 bg-white rounded-xl shadow-custom-inner-shadow relative z-20 -mt-20">
          <div className="flex justify-center mt-12 space-x-8">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`bg-${typeInfo.type.name} text-white rounded-xl font-bold py-2 px-4`}
              >
                {capitalizeName(typeInfo.type.name)}
              </span>
            ))}
          </div>

          {/* About section */}
          <div className="mt-4">
            <h2 className={`text-lg font-bold text-center ${textColor}`}>
              About
            </h2>
            <div className="mt-10 flex justify-center items-center space-x-10">
              <div className="flex items-center space-x-2">
                <img src="/weight.svg" alt="Peso" className="w-8 h-8" />
                <div className="flex flex-col items-start">
                  <p className="text-xl font-semibold">
                    {pokemon.weight / 10} kg
                  </p>
                  <p className="text-light">Weight</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/regla.svg" alt="Altura" className="origin-center rotate-90 w-8 h-8" />
                <div className="flex flex-col items-start">
                  <p className="text-xl font-semibold">
                    {pokemon.height / 10} m
                  </p>
                  <p className="text-light">Height</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex flex-col items-start">
                  <p className="text-xl font-semibold whitespace-pre-line">
                    {pokemon.abilities
                      .map((abilityInfo) =>
                        capitalizeName(abilityInfo.ability.name)
                      )
                      .join("\n")}
                  </p>
                  <p className="text-light">Abilities</p>
                </div>
              </div>
            </div>
            <p className="text-center mt-10">
              {capitalizeName(pokemon.name)} is a {typeNames} type Pokémon.
            </p>
          </div>

          {/* Pokémon Data */}
          <div className="mt-4">
            <h2 className={`text-center text-lg font-bold`}>Base stats</h2>
            <ul className="space-y-2 text-end">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="flex items-center">
                  <span className={`w-24 font-bold ${textColor}`}>
                    {capitalizeName(stat.stat.name)}
                  </span>
                  <span className="ml-2 font-bold">{stat.base_stat}</span>
                  <div className="w-full bg-gray-200 rounded-full h-3 ml-2">
                    <div
                      className={`${progressBarColor} h-3 rounded-full`}
                      style={{ width: `${stat.base_stat}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
