"use client";

import { trpc } from "@/server/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));

  const [trpcClient] = useState(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "https://pokerepo.vercel.app/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Your app here */}
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
