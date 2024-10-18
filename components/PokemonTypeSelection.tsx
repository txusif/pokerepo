import React from "react";

interface PokemonTypeSelectionProps {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
}

export const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  selectedType,
  selectType,
}) => {
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
