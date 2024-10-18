import React, { useState } from "react";
import { trpc } from "@/server/client";
import { PokemonTypeSelection } from "@/components/PokemonTypeSelection";
import { PokedexTable } from "@/components/PokedexTable";

export const FilterablePokedexTable: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const pokemonQuery = trpc.getPokemonByType.useQuery(selectedType || "", {
    enabled: true,
  });

  return (
    <div>
      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={setSelectedType}
      />
      {pokemonQuery.data && pokemonQuery.data.length > 0 && (
        <PokedexTable pokemonArray={pokemonQuery.data} />
      )}
    </div>
  );
};
