// "use client";

// import * as React from "react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Github,
//   Search,
//   Linkedin,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { trpc } from "@/server/client";

// // Subcomponents
// const PokemonRow: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
//   return (
//     <div className="flex items-center space-x-4 p-2 border-b border-gray-700 last:border-b-0">
//       <img src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16" />
//       <div>
//         <p className="font-bold text-white">{pokemon.name}</p>
//         <p className="text-gray-300">Id: {pokemon.id}</p>
//         <p className="text-gray-300">Types: {pokemon.types.join(", ")}</p>
//       </div>
//     </div>
//   );
// };

// const PokedexTable: React.FC<{ pokemonArray: Pokemon[] }> = ({
//   pokemonArray,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;
//   const totalPages = Math.ceil(pokemonArray.length / itemsPerPage);

//   const getCurrentPageData = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return pokemonArray.slice(startIndex, endIndex);
//   };

//   return (
//     <div>
//       <div className="overflow-hidden">
//         {getCurrentPageData().map((pokemon) => (
//           <PokemonRow key={pokemon.id} pokemon={pokemon} />
//         ))}
//       </div>
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-5 items-center mt-4">
//           <Button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="bg-gray-700 hover:bg-gray-600 rounded-full"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             {/* Previous */}
//           </Button>
//           <span className="text-gray-300">
//             Page {currentPage} of {totalPages}
//           </span>
//           <Button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="bg-gray-700 hover:bg-gray-600 rounded-full"
//           >
//             {/* Next */}
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// const PokemonTypeSelection: React.FC<{
//   selectedType: string | undefined;
//   selectType: (type: string | undefined) => void;
// }> = ({ selectedType, selectType }) => {
//   const types = [
//     "electric",
//     "fire",
//     "flying",
//     "psychic",
//     "water",
//     "ghost",
//     "poison",
//     "dragon",
//     "normal",
//     "grass",
//     "fairy",
//     "fighting",
//     "rock",
//     "ground",
//     "ice",
//     "bug",
//   ];

//   return (
//     <div className="mb-4">
//       <select
//         value={selectedType || ""}
//         onChange={(e) => selectType(e.target.value || undefined)}
//         className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
//       >
//         <option value="">All Types</option>
//         {types.map((type) => (
//           <option key={type} value={type.toLowerCase()}>
//             {type}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// const FilterablePokedexTable: React.FC = () => {
//   const [selectedType, setSelectedType] = useState<string | undefined>(
//     undefined
//   );
//   const pokemonQuery = trpc.getPokemonByType.useQuery(selectedType || "", {
//     enabled: true,
//   });

//   return (
//     <div>
//       <PokemonTypeSelection
//         selectedType={selectedType}
//         selectType={setSelectedType}
//       />
//       {pokemonQuery.data && pokemonQuery.data.length > 0 && (
//         <div className="mt-4 max-h-96 overflow-y-auto border border-gray-700 rounded-lg bg-gray-800">
//           <PokedexTable pokemonArray={pokemonQuery.data} />
//         </div>
//       )}
//     </div>
//   );
// };

// // Main component
// export default function Hero() {
//   const [searchInput, setSearchInput] = useState("");

//   const singlePokemonQuery = trpc.getPokemonByName.useQuery(searchInput, {
//     enabled: false,
//   });

//   const multiplePokemonQuery = trpc.getPokemonByNames.useQuery(
//     searchInput.split(",").map((name) => name.trim()),
//     { enabled: false }
//   );

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchInput.includes(",")) {
//       multiplePokemonQuery.refetch();
//     } else {
//       singlePokemonQuery.refetch();
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900">
//       <div className="flex-grow py-12">
//         <header className="mb-12 text-center">
//           <div className="flex items-center justify-center mb-4">
//             <Image
//               src="/logo.svg"
//               alt="Pokeball Logo"
//               width={48}
//               height={48}
//               className="h-12 w-12"
//             />
//             <h1 className="ml-4 text-4xl font-bold text-red-500">PokéRepo</h1>
//           </div>
//           <p className="text-xl text-gray-300">
//             Your ultimate Pokémon information hub
//           </p>
//         </header>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-2xl font-bold text-white">
//                 Search Pokemon
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form
//                 onSubmit={handleSearch}
//                 className="space-y-4 md:space-y-0 md:flex md:space-x-2"
//               >
//                 <Input
//                   type="text"
//                   value={searchInput}
//                   onChange={(e) => setSearchInput(e.target.value)}
//                   placeholder="Enter Pokemon name(s), separate multiple with commas"
//                   className="bg-gray-700 text-white border-gray-600 flex-grow"
//                 />
//                 <Button
//                   type="submit"
//                   className="w-full md:w-auto bg-red-500 text-white hover:bg-red-600"
//                 >
//                   <Search className="h-4 w-4 mr-2" />
//                   Search
//                 </Button>
//               </form>

//               {(singlePokemonQuery.data ||
//                 (multiplePokemonQuery.data &&
//                   multiplePokemonQuery.data.length > 0)) && (
//                 <div className="mt-4 max-h-96 overflow-y-auto border border-gray-700 rounded-lg bg-gray-800">
//                   {singlePokemonQuery.data && !searchInput.includes(",") && (
//                     <PokemonRow pokemon={singlePokemonQuery.data} />
//                   )}

//                   {multiplePokemonQuery.data && searchInput.includes(",") && (
//                     <PokedexTable pokemonArray={multiplePokemonQuery.data} />
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-2xl font-bold text-white">
//                 Filter Pokemon by Type
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <FilterablePokedexTable />
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       <footer className="py-6 text-center text-gray-400 bg-gray-800">
//         {/* <div className="flex justify-center space-x-4 mb-4">
//           <Link
//             href="https://github.com/txusif"
//             target="_blank"
//             className="hover:text-white"
//           >
//             <Github className="h-6 w-6" />
//             <span className="sr-only">GitHub</span>
//           </Link>
//           <Link
//             href="https://linkedin.com/in/txusif"
//             target="_blank"
//             className="hover:text-white"
//           >
//             <Linkedin className="h-6 w-6" />
//             <span className="sr-only">LinkedIn</span>
//           </Link>
//         </div> */}
//         <p className="text-sm">© 2024 PokéRepo. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// interface Pokemon {
//   id: number;
//   name: string;
//   types: string[];
//   sprite: string;
// }

"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Github,
  Search,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { trpc } from "@/server/client";

// Subcomponents
const PokemonRow: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
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

const PokedexTable: React.FC<{ pokemonArray: Pokemon[] }> = ({
  pokemonArray,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(pokemonArray.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pokemonArray.slice(startIndex, endIndex);
  };

  return (
    <div>
      <div className="overflow-hidden">
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
      {pokemonQuery.data && pokemonQuery.data.length > 0 && (
        <div className="mt-4 max-h-96 overflow-y-auto border border-gray-700 rounded-lg bg-gray-800">
          <PokedexTable pokemonArray={pokemonQuery.data} />
        </div>
      )}
    </div>
  );
};

// Main component
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
              <CardTitle className="text-2xl font-bold text-white">
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
                  onChange={(e) => setSearchInput(e.target.value)}
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
              <CardTitle className="text-2xl font-bold text-white">
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
        <p className="text-sm">© 2024 PokéRepo. All rights reserved.</p>
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
