"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { trpc } from "@/server/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PokemonRow } from "@/components/PokemonRow";
import { PokedexTable } from "@/components/PokedexTable";
import { FilterablePokedexTable } from "@/components/FilterablePokedexTable";

export default function Hero() {
  const [searchInput, setSearchInput] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const singlePokemonQuery = trpc.getPokemonByName.useQuery(searchInput, {
    enabled: false,
  });

  const multiplePokemonQuery = trpc.getPokemonByNames.useQuery(
    searchInput.split(",").map((name) => name.trim()),
    { enabled: false }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearched(true);
    if (searchInput.includes(",")) {
      multiplePokemonQuery.refetch();
    } else {
      singlePokemonQuery.refetch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setIsSearched(false);
  };

  const renderSearchResults = () => {
    if (!isSearched) return null;

    if (
      singlePokemonQuery.data ||
      (multiplePokemonQuery.data && multiplePokemonQuery.data.length > 0)
    ) {
      return (
        <div className="mt-4 max-h-96 overflow-y-auto border border-gray-700 rounded-lg bg-gray-800">
          {singlePokemonQuery.data && !searchInput.includes(",") && (
            <PokemonRow pokemon={singlePokemonQuery.data} />
          )}

          {multiplePokemonQuery.data && searchInput.includes(",") && (
            <PokedexTable pokemonArray={multiplePokemonQuery.data} />
          )}
        </div>
      );
    } else {
      return (
        <div className="mt-4 p-4 text-center text-gray-300 border border-gray-700 rounded-lg bg-gray-800">
          Pokemon not found
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="flex-grow py-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo.svg"
              alt="Pokeball Logo"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <h1 className="ml-4 text-4xl font-bold text-red-500">PokéRepo</h1>
          </div>
          <p className="text-xl text-gray-300">
            Your ultimate Pokémon information hub
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold tracking-wider text-white">
                Search Pokemon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSearch}
                className="space-y-4 md:space-y-0 md:flex md:space-x-2"
              >
                <Input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  placeholder="Enter Pokemon name(s), separate multiple with commas"
                  className="bg-gray-700 text-white border-gray-600 flex-grow"
                />
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-red-500 text-white hover:bg-red-600"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>

              {renderSearchResults()}
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold tracking-wider text-white">
                Filter Pokemon by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FilterablePokedexTable />
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className="py-6 text-center text-gray-400 bg-gray-800">
        <p className="text-sm">&copy; 2024 PokéRepo. All rights reserved.</p>
      </footer>
    </div>
  );
}
