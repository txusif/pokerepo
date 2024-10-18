# PokéRepo

PokéRepo is a web application that allows users to search and filter Pokémon by name or type.

## Features

- Search Pokémon by name
- Filter Pokémon by type
- View Pokémon name, type and image
- Responsive design for various devices

## Technologies Used

- Next.js
- React
- TypeScript
- Prisma
- tRPC
- Tailwind CSS
- Shadcn UI

## Getting Started

To get started with PokéRepo, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/txusif/pokerepo.git
   cd pokerepo
   ```

2. Install dependencies using pnpm:

   ```
   pnpm install
   ```

3. Create a .env file in the root directory and add your database URL:

   ```
   DATABASE_URL=your_database_url_here
   ```

4. Run the database migrations:

   ```
   pnpm migrate
   ```

5. Add the prisma.seed field to your package.json file:

   ```json
   {
     "name": "my-project",
     "version": "1.0.0",
     "prisma": {
       "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
     },
     "devDependencies": {
       "@types/node": "^14.14.21",
       "ts-node": "^9.1.1",
       "typescript": "^4.1.3"
     }
   }
   ```

6. Seed the database with initial data:

   ```
   npx prisma db seed
   ```

7. Run the development server:

   ```
   pnpm dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Scripts

- `pnpm dev`: Runs the app in development mode
- `pnpm migrate`: Runs Prisma migrations for the database
- `pnpm generate`: Generates Prisma client based on the schema
- `pnpm studio`: Opens Prisma Studio to manage your database through a web interface
- `npx prisma db seed`: Seeds the database with initial data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Toushief Ansari - [txusif@gmail.com](mailto:txusif@gmail.com)
