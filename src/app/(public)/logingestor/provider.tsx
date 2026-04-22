"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

export function LoginProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={defaultSystem}>
    {children}
    </ChakraProvider>;
}