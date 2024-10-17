import React from "react";
import PokemonRow from "./PokemonRow";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

interface PokedexTableProps {
  pokemonArray: Pokemon[];
}

const PokedexTable: React.FC<PokedexTableProps> = ({ pokemonArray }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      {pokemonArray.map((pokemon) => (
        <PokemonRow key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokedexTable;
