import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PokemonRow } from "@/components/PokemonRow";
import { Pokemon } from "./types";

export const PokedexTable: React.FC<{ pokemonArray: Pokemon[] }> = ({
  pokemonArray,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 2;
  const totalPages = Math.ceil(pokemonArray.length / ITEMS_PER_PAGE);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return pokemonArray.slice(startIndex, endIndex);
  };

  return (
    <>
      <div className="border border-gray-700 rounded-lg bg-gray-800 overflow-hidden">
        {getCurrentPageData().map((pokemon) => (
          <PokemonRow key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-5 items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-700 hover:bg-gray-600 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-700 hover:bg-gray-600 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
};
