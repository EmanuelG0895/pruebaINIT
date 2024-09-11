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
    <a href={`/pokemon/${pokemonId}`}>
      <div className="p-4 text-center rounded-xl bg-[linear-gradient(to_bottom,#FFFF_60%,#E0E0E0_40%)] shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="mb-2 text-right">#{pokemonId}</div>
        <img
          src={pokemonImg}
          className="w-28 h-28 mx-auto"
          alt={pokemonNombre}
        />
        <div className="p-2 rounded-xl">
          <p className="capitalize">{pokemonNombre}</p>
        </div>
      </div>
    </a>
  );
}
