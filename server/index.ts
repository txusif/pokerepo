import { PrismaClient } from '@prisma/client'

import { publicProcedure, router } from "./trpc";
import { z } from 'zod';

const prisma = new PrismaClient();

export const appRouter = router({
    getPokemons: publicProcedure.query(async () => {
        return await prisma.pokemon.findMany();
    }),

    getPokemonByName: publicProcedure
        .input(z.string())
        .query(async (opts) => {
            const { input } = opts;
            const inputTitleCase = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            return await prisma.pokemon.findUnique({
                where: {
                    name: inputTitleCase
                }
            });
        }),

    getPokemonByNames: publicProcedure
        .input(z.array(z.string()))
        .query(async (opts) => {
            const { input } = opts;
            const inputTitleCased = input.map(name =>
                name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            );
            return await prisma.pokemon.findMany({
                where: {
                    name: {
                        in: inputTitleCased
                    }
                }
            });
        }),
});

export type AppRouter = typeof appRouter;