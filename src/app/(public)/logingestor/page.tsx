"use client";

import { useState } from "react";
import { ChakraProvider, defaultSystem, Box, Button, Input, Text, VStack, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

// Alterado para export default direto na função principal
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login de Gestor:", email);
    router.push("/gestor/dashboard");
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Box minH="100vh" position="relative" display="flex" alignItems="center" justifyContent="center" overflow="hidden">
        <Box position="absolute" inset="0" bgImage="url('/images/recife.jpg')" bgSize="cover" bgPos="center" bgRepeat="no-repeat" zIndex="0" />
        <Box position="absolute" inset="0" bg="linear-gradient(135deg, #3D2683cc 0%, #8528FFaa 50%, #FF6636cc 100%)" zIndex="1" />

        <Box as="nav" position="absolute" top="0" left="0" right="0" display="flex" justifyContent="space-between" alignItems="center" px={{ base: 8, md: 16 }} py={{ base: 6, md: 10 }} zIndex="30">
          <Link href="/" passHref>
            <Text fontSize="2xl" fontWeight="bold" color="white" opacity="0.7" cursor="pointer" _hover={{ opacity: 1 }} transition="all 0.3s">Smart City</Text>
          </Link>
          <Button variant="outline" color="white" borderColor="white" px={6} _hover={{ bg: "white", color: "purple.600", transform: "translateY(-2px)" }} transition="all 0.2s" asChild>
            <Link href="/">← Voltar</Link>
          </Button>
        </Box>

        <Box position="relative" bg="white" p={8} rounded="2xl" shadow="2xl" w="full" maxW="400px" zIndex="10" mx={4}>
          <VStack gap={6} as="form" onSubmit={handleSubmit}>
            <Heading size="lg" color="purple.700" textAlign="center">Smart City</Heading>
            
            <VStack w="full" gap={3}>
              <Button type="button" w="full" bg="purple.600" color="white" _hover={{ bg: "purple.700" }}>Entrar com Certificado Digital</Button>
              <Button type="button" w="full" bg="purple.500" color="white" _hover={{ bg: "purple.600" }}>Entrar com gov.br</Button>
            </VStack>

            <Text fontSize="sm" textAlign="center" color="gray.600">
              Faça login em sua conta de gestor. Ou <Link href="/cadastro"><Text as="span" color="purple.600" fontWeight="bold" cursor="pointer" _hover={{ textDecoration: "underline" }}>Cadastre-se</Text></Link>
            </Text>

            <VStack w="full" gap={4}>
              <Box w="full">
                <Text fontSize="sm" mb={1} fontWeight="medium" color="gray.700">Email</Text>
                <Input 
                  required 
                  type="email" 
                  placeholder="seu@email.com" 
                  bg="purple.50" 
                  borderColor="purple.200" 
                  _focus={{ borderColor: "purple.600", outline: "none", bg: "white" }} 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Box>
              <Box w="full">
                <Text fontSize="sm" mb={1} fontWeight="medium" color="gray.700">Senha</Text>
                <Input 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  bg="purple.50" 
                  borderColor="purple.200" 
                  _focus={{ borderColor: "purple.600", outline: "none", bg: "white" }} 
                  value={senha} 
                  onChange={(e) => setSenha(e.target.value)} 
                />
              </Box>
            </VStack>

            <Button 
              type="submit" 
              w="full" 
              size="lg" 
              bg="purple.600" 
              color="white" 
              fontWeight="bold" 
              _hover={{ bg: "purple.700", shadow: "md" }}
            >
              ENTRAR
            </Button>
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
}