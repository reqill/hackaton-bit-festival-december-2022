import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import { Box, ChakraProvider, VStack } from '@chakra-ui/react';
import theme from '../src/theme';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Navigation } from 'src/components/Navigation';
import { Footer } from 'src/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Box overflowX="hidden" maxW="100vw" backgroundColor="gray.50" minH="100vh">
          <VStack>
            <Navigation />
            <Component {...pageProps} />
            <Footer />
          </VStack>
        </Box>
      </ChakraProvider>
    </UserProvider>
  );
}
