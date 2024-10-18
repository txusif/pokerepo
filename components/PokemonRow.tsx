import React from "react";
import { Pokemon } from "./types";

export const PokemonRow: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <div className="flex items-center space-x-4 p-2 border-b border-gray-700 last:border-b-0">
      <img src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16" />
      <div>
        <p className="font-bold text-white">{pokemon.name}</p>
        <p className="text-gray-300">Id: {pokemon.id}</p>
        <p className="text-gray-300">Types: {pokemon.types.join(", ")}</p>
      </div>
    </div>
  );
};
