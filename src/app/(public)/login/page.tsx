"use client";

import { useState } from "react";
import { ChakraProvider, defaultSystem, Box, Button, Input, Text, VStack, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useDemandStore } from "@/stores/useDemandStore"; 

export default function Page() {
  return (
    <ChakraProvider value={defaultSystem}>
      <LoginPage />
    </ChakraProvider>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter(); 
  const login = useDemandStore((state) => state.login); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    login(email); 
    
    console.log("Login efetuado e salvo no store:", email);
    
    router.push("/telaUsuario");
  };

  return (
    <Box minH="100vh" position="relative" display="flex" alignItems="center" justifyContent="center" overflow="hidden">
      <Box position="absolute" inset="0" bgImage="url('/images/recife.jpg')" bgSize="cover" bgPos="center" bgRepeat="no-repeat" zIndex="0" />
      <Box position="absolute" inset="0" bg="linear-gradient(135deg, #3D2683cc 0%, #8528FFaa 50%, #FF6636cc 100%)" zIndex="1" />

      <Box as="nav" position="absolute" top="0" left="0" right="0" display="flex" justifyContent="space-between" alignItems="center" px={{ base: 8, md: 16 }} py={{ base: 6, md: 10 }} zIndex="30">
        <Link href="/" passHref>
          <Text fontSize="2xl" fontWeight="bold" color="white" opacity="0.7" cursor="pointer" _hover={{ opacity: 1 }}>Smart City</Text>
        </Link>
        <Button variant="outline" color="white" borderColor="white" asChild>
          <Link href="/">← Voltar</Link>
        </Button>
      </Box>

      <Box position="relative" bg="white" p={8} rounded="2xl" shadow="2xl" w="full" maxW="400px" zIndex="10" mx={4}>
        <VStack gap={6} as="form" onSubmit={handleSubmit}> 
          <Heading size="lg" color="purple.700" textAlign="center">Smart City</Heading>
          
          <VStack w="full" gap={3}>
            <Button type="button" w="full" bg="purple.600" color="white">Entrar com Certificado Digital</Button>
            <Button type="button" w="full" bg="purple.500" color="white">Entrar com gov.br</Button>
          </VStack>

          <Text fontSize="sm" textAlign="center" color="gray.600">
            Faça login em sua conta. Ou{" "}
            <Link href="/cadastro">
              <Text as="span" color="purple.600" fontWeight="bold" cursor="pointer">Cadastre-se</Text>
            </Link>
          </Text>

          <VStack w="full" gap={4}>
            <Box w="full">
              <Text fontSize="sm" mb={1} fontWeight="medium" color="gray.700">Email</Text>
              <Input 
                required 
                type="email" 
                placeholder="seu@email.com" 
                bg="purple.50" 
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
            _hover={{ bg: "purple.700" }}
          >
            ENTRAR
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}