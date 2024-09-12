"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { getPokemons, Pokemon } from "../services/pokeapi";
import PokemonCard from "../components/pokemonCard";
import Image from "next/image";
import Pagination from "../components/Pagination"; // Asegúrate de importar el componente de paginación

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1); // Cambiado a página
  const [totalPages, setTotalPages] = useState<number>(1); // Total de páginas
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const loadPokemons = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await getPokemons(10, (pageNumber - 1) * 10); // Ajustado para usar la página
      setPokemons((prevPokemons) => {
        const prevPokemonSet = new Set(
          prevPokemons.map((pokemon) => pokemon.url)
        );
        const newPokemons = data.results.filter(
          (pokemon: Pokemon) => !prevPokemonSet.has(pokemon.url)
        );
        return [...prevPokemons, ...newPokemons];
      });
      setTotalPages(Math.ceil(data.count / 10)); // Ajusta el total de páginas
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterPokemons = (term: string) => {
    const filtered = pokemons.filter((pokemon) => {
      const id = pokemon.url.split("/").filter(Boolean).pop();
      return (
        pokemon.name.toLowerCase().includes(term.toLowerCase()) ||
        id.includes(term)
      );
    });
    setFilteredPokemons(filtered);
  };

  useEffect(() => {
    loadPokemons(page); // Cargar Pokémon iniciales
  }, [page]);

  useEffect(() => {
    filterPokemons(searchTerm);
  }, [searchTerm, pokemons]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    setPokemons([]); // Limpiar los Pokémon actuales al cambiar de página
  };

  return (
    <div className="h-screen shadow-lg p-2 bg-primary">
      <div className="titulo flex mb-4 p-4">
        <Image
          className="mr-3"
          src="/Pokeball.svg"
          alt="pokeball"
          width={45}
          height={45}
        />
        <h1 className="text-4xl font-bold text-white text-left">Pokédex</h1>
      </div>
      <div className="relative mb-8 w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by number or name"
          className="w-full pl-12 p-4 rounded-full shadow-lg border-2 border-white text-gray-700 focus:outline-none"
        />
        <Image
          src="/search.svg"
          alt="Search icon"
          width={24}
          height={24}
          className="absolute top-1/2 left-3 transform -translate-y-1/2"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 bg-white rounded-xl shadow-custom-inner-shadow p-4">
        {filteredPokemons.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          return (
            <PokemonCard
              key={pokemon.url}
              pokemonId={Number(id)}
              pokemonImg={imgUrl}
              pokemonNombre={pokemon.name}
            />
          );
        })}
      </div>
      <div className="text-center mt-4">
        {loading && <span className="text-lg text-white">Loading...</span>}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
