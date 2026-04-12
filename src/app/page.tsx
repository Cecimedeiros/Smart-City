'use client';

import { Provider } from "@/components/UI/provider";
import { Box, Button, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function HomePage() {
  // Gradiente idêntico ao da imagem (Roxo vibrante para Laranja vivo)
  const bgGradient = 'linear-gradient(135deg, rgba(100, 40, 200, 0.85) 0%, rgba(220, 20, 120, 0.75) 50%, rgba(255, 100, 50, 0.65) 100%)';

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-900">
      
      {/* Imagem de Fundo (Tailwind) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/recife.jpg')" }}
      />

      <Provider>
        <Box position="relative" zIndex={10} width="100%" height="100vh" color="white">
          
          {/* Overlay de Gradiente */}
          <Box position="absolute" inset="0" background={bgGradient} zIndex={11} />

          <Container maxW="1400px" height="full" position="relative" zIndex={12} px={16}>
            <Flex direction="column" height="full" py={20}>

              {/* Logo Smart City */}
              <Heading as="h1" fontSize="35px" fontWeight="bold" letterSpacing="tight">
                Smart City
              </Heading>

              <Flex flex="1" align="center" justify="space-between" wrap="wrap">
                
                {/* Lado Esquerdo - O TÍTULO GIGANTE */}
                <VStack align="flex-start" gap={12} maxW="900px">
                  <Heading
                    as="h2"
                    fontSize="130px" // TAMANHO GIGANTE
                    lineHeight="0.85"
                    fontWeight="700"
                    letterSpacing="-5px"
                  >
                    Sua cidade <br /> em suas mãos
                  </Heading>

                  {/* Botão Denúncia - O "Laranja" da imagem */}
                  <Button
                    asChild
                    height="110px"
                    px="60px"
                    fontSize="45px" // Texto do botão bem grande
                    fontWeight="700"
                    borderRadius="25px"
                    background="linear-gradient(to right, #FF6B4A, #FF4E50)"
                    boxShadow="0 15px 35px rgba(255, 78, 80, 0.4)"
                    _hover={{ transform: "scale(1.05)", filter: "brightness(1.1)" }}
                    cursor="pointer"
                  >
                    <Link href="/cadastro">Faça sua denúncia</Link>
                  </Button>
                </VStack>

                {/* Lado Direito - O texto de apoio */}
                <Box maxW="450px" mt="150px">
                  <Text fontSize="28px" lineHeight="1.2" fontWeight="400" opacity="0.9">
                    Registre, acompanhe e resolva: a plataforma que conecta a voz do cidadão à gestão da cidade.
                  </Text>
                </Box>
              </Flex>

              {/* Botão Sou Gestor - O Roxo vibrante no canto */}
              <Flex justify="flex-end">
                <Button
                  asChild
                  height="80px"
                  px="50px"
                  fontSize="24px"
                  fontWeight="bold"
                  borderRadius="20px"
                  background="#7F3DFF" // Roxo da imagem
                  _hover={{ background: "#6A26F0" }}
                  boxShadow="0 10px 25px rgba(127, 61, 255, 0.3)"
                >
                  <Link href="/gestor">Sou gestor</Link>
                </Button>
              </Flex>

            </Flex>
          </Container>
        </Box>
      </Provider>
    </div>
  );
}