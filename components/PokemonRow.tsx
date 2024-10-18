import React from "react";
import { Pokemon } from "./types";
import Image from "next/image";

export const PokemonRow: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <div className="flex items-center space-x-4 p-2 border-b border-gray-700 last:border-b-0">
      <div className="relative w-16 h-16">
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          layout="fill"
          quality={100}
          className="object-contain"
        />
      </div>
      <div>
        <p className="font-bold text-white">{pokemon.name}</p>
        <p className="text-gray-300">Id: {pokemon.id}</p>
        <p className="text-gray-300">Types: {pokemon.types.join(", ")}</p>
      </div>
    </div>
  );
};
