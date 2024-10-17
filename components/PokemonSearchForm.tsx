"use client";

import React, { useState } from "react";
import PokemonRow from "./PokemonRow";
import PokedexTable from "./PokedexTable";
import { trpc } from "@/server/client";

const PokemonSearchForm = () => {
  const [searchInput, setSearchInput] = useState("");

  const singlePokemonQuery = trpc.getPokemonByName.useQuery(searchInput, {
    enabled: false,
  });

  const multiplePokemonQuery = trpc.getPokemonByNames.useQuery(
    searchInput.split(",").map((name) => name.trim()),
    { enabled: false }
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.includes(",")) {
      multiplePokemonQuery.refetch();
    } else {
      singlePokemonQuery.refetch();
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter Pokemon name(s), separate multiple with commas"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Search Pokemon
        </button>
      </form>

      {singlePokemonQuery.data && !searchInput.includes(",") && (
        <PokemonRow pokemon={singlePokemonQuery.data} />
      )}

      {multiplePokemonQuery.data && searchInput.includes(",") && (
        <PokedexTable pokemonArray={multiplePokemonQuery.data} />
      )}
    </div>
  );
};

export default PokemonSearchForm;
