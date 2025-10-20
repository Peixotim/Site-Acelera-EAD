"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./index";

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      
        <Sonner />
        <Index />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
