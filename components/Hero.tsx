"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Search, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { trpc } from "@/server/client";

// Subcomponents
const PokemonRow: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <div className="flex items-center space-x-4 p-2 border-b border-gray-700">
      <img src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16" />
      <div>
        <p className="font-bold text-white">{pokemon.name}</p>
        <p className="text-gray-300">ID: {pokemon.id}</p>
        <p className="text-gray-300">Types: {pokemon.types.join(", ")}</p>
      </div>
    </div>
  );
};

const PokedexTable: React.FC<{ pokemonArray: Pokemon[] }> = ({
  pokemonArray,
}) => {
  return (
    <div className="overflow-hidden">
      {pokemonArray.map((pokemon) => (
        <PokemonRow key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

const PokemonTypeSelection: React.FC<{
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
}> = ({ selectedType, selectType }) => {
  const types = [
    "electric",
    "fire",
    "flying",
    "psychic",
    "water",
    "ghost",
    "poison",
    "dragon",
    "normal",
    "grass",
    "fairy",
    "fighting",
    "rock",
    "ground",
    "ice",
    "bug",
  ];

  return (
    <div className="mb-4">
      <select
        value={selectedType || ""}
        onChange={(e) => selectType(e.target.value || undefined)}
        className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type.toLowerCase()}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

const FilterablePokedexTable: React.FC = () => {
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
      {pokemonQuery.data && (
        <div className="mt-4 max-h-96 overflow-y-auto border border-gray-700 rounded-lg bg-gray-800">
          {" "}
          <PokedexTable pokemonArray={pokemonQuery.data} />
        </div>
      )}
    </div>
  );
};

// Main component
export default function Hero() {
  const [searchInput, setSearchInput] = useState("");

  const singlePokemonQuery = trpc.getPokemonByName.useQuery(searchInput, {
    enabled: false,
  });

  const multiplePokemonQuery = trpc.getPokemonByNames.useQuery(
    searchInput.split(",").map((name) => name.trim()),
    { enabled: false }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.includes(",")) {
      multiplePokemonQuery.refetch();
    } else {
      singlePokemonQuery.refetch();
    }
  };

  return (
    <div className="py-12 bg-gray-900 min-h-screen">
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/logo.png"
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
            <CardTitle className="text-2xl font-bold text-white">
              Search Pokemon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Pokemon name(s), separate multiple with commas"
                className="bg-gray-700 text-white border-gray-600"
              />
              <Button
                type="submit"
                className="w-full bg-red-500 text-white hover:bg-red-600"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Pokemon
              </Button>
            </form>

            <div className="mt-4 max-h-96 overflow-y-auto border border-gray-700 rounded-lg bg-gray-800">
              {singlePokemonQuery.data && !searchInput.includes(",") && (
                <PokemonRow pokemon={singlePokemonQuery.data} />
              )}

              {multiplePokemonQuery.data && searchInput.includes(",") && (
                <PokedexTable pokemonArray={multiplePokemonQuery.data} />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Filter Pokemon by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FilterablePokedexTable />
          </CardContent>
        </Card>
      </div>
      <footer className="mt-12 text-center text-gray-400">
        <div className="flex justify-center space-x-4">
          <Link
            href="https://github.com/txusif"
            target="_blank"
            className="hover:text-white"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/txusif"
            target="_blank"
            className="hover:text-white"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
        <p className="text-sm mt-4">© 2024 PokéRepo. All rights reserved.</p>
      </footer>
    </div>
  );
}

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}
