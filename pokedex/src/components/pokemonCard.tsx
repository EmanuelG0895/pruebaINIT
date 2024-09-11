interface PokemonCardProps {
  pokemonId: number;
  pokemonImg: string;
  pokemonNombre: string;
}

export default function PokemonCard({
  pokemonId,
  pokemonImg,
  pokemonNombre,
}: PokemonCardProps) {
  return (
    <>
      <a
        href={`/pokemon/${pokemonId}`}
        className="w-full sm:w-72 md:w-56 lg:w-72 h-44 flex flex-col justify-end bg-white shadow-drop-shadow-2dp mb-3 mt-7 relative mx-auto rounded-xl"
      >
        <div className="text-center relative z-10">
          <div className="text-light idPokemnon text-right mb-16 mr-3">#{pokemonId}</div>
          <img
            src={pokemonImg}
            className="h-28 max-w-xs absolute -bottom-10 left-1/2 transform -translate-x-1/2"
            alt={pokemonNombre}
          />
        </div>
        <div className="bg-light nombre w-full h-14 rounded-xl text-center flex flex-col justify-center relative z-0 mt-3 mb-0">
          <h2 className="text-dark font-bold">{pokemonNombre}</h2>
        </div>
      </a>
    </>
  );
}
