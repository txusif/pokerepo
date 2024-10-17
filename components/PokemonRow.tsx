import React from "react";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

interface PokemonRowProps {
  pokemon: Pokemon;
}

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
  return (
    <div className="flex items-center space-x-4 p-2 border-b">
      <img src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16" />
      <div>
        <p className="font-bold">{pokemon.name}</p>
        <p>ID: {pokemon.id}</p>
        <p>Types: {pokemon.types.join(", ")}</p>
      </div>
    </div>
  );
};

export default PokemonRow;
