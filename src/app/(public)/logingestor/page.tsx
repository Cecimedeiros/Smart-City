"use client";

import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Heading,
  Checkbox,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Page() {
  return (
    <ChakraProvider>
      <LoginPage />
    </ChakraProvider>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <Box minH="100vh" position="relative" display="flex" alignItems="center" justifyContent="center">

      {/* 🌆 BACKGROUND COM IMAGEM */}
      <Box
        position="absolute"
        inset="0"
        bgImage="url('/images/recife.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      />

      {/* 🎨 GRADIENTE */}
      <Box
        position="absolute"
        inset="0"
        bg="linear-gradient(135deg, #3D2683cc 0%, #8528FFaa 50%, #FF6636cc 100%)"
      />

      {/* 📦 CARD */}
      <Box
        position="relative"
        bg="white"
        p={8}
        rounded="lg"
        shadow="xl"
        w="400px"
      >
        <VStack spacing={4}>

          {/* TÍTULO */}
          <Heading size="lg" color="purple.600">
            Smart City
          </Heading>

          {/* BOTÕES */}
          <Button
            w="full"
            bg="purple.600"
            color="white"
            _hover={{ bg: "purple.700" }}
          >
            Entrar com Certificado Digital
          </Button>

          <Button
            w="full"
            bg="purple.500"
            color="white"
            _hover={{ bg: "purple.600" }}
          >
            Entrar com gov.br
          </Button>

          {/* TEXTO */}
          <Text fontSize="sm" textAlign="center">
            Faça login em sua conta. <br />
            Ou{" "}
          <Link href="/cadastro">
            <Text as="span" color="purple.600" fontWeight="bold" cursor="pointer">
              Cadastre-se
            </Text>
          </Link>
          </Text>

          {/* INPUT EMAIL */}
          <Box w="full">
            <Text fontSize="sm" mb={1}>
              Email
            </Text>
            <Input
              bg="purple.50"
              borderColor="purple.300"
              _hover={{ borderColor: "purple.400" }}
              _focus={{
                borderColor: "purple.600",
                boxShadow: "0 0 0 1px purple.600",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          {/* INPUT SENHA */}
          <Box w="full">
            <Text fontSize="sm" mb={1}>
              Senha
            </Text>
            <Input
              type="password"
              bg="purple.50"
              borderColor="purple.300"
              _hover={{ borderColor: "purple.400" }}
              _focus={{
                borderColor: "purple.600",
                boxShadow: "0 0 0 1px purple.600",
              }}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Box>

          {/* CHECKBOX */}
          <Box display="flex" justifyContent="space-between" w="full" fontSize="sm">
            <Checkbox colorScheme="purple">
              Mantenha-me conectado
            </Checkbox>

            <Text color="gray.500" cursor="pointer">
              Esqueceu a senha?
            </Text>
          </Box>

          {/* BOTÃO FINAL */}
        <Button
          asChild
          w="full"
          bg="purple.600"
          color="white"
          _hover={{ bg: "purple.700" }}
        >
          <Link href="/gestor">
            ENTRAR
          </Link>
        </Button>
        </VStack>
      </Box>
    </Box>
  );
}