import PokemonSearchForm from "@/components/PokemonSearchForm";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Typography variant="h3">Welcome to the Pokedex</Typography>
      <PokemonSearchForm />
    </main>
  );
}
