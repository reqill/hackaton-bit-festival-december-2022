import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import { Box, ChakraProvider, HStack, Show, VStack } from '@chakra-ui/react';
import theme from '../src/theme';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {
  DashboardNavigation,
  MainNavigation,
  MobileDashboardNavigation,
} from 'src/components/Navigation';
import { Footer } from 'src/components/Footer';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboard = router.pathname.includes('/dashboard');

  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Box overflowX="hidden" maxW="100vw" w="100vw" backgroundColor="gray.50" minH="100vh">
          {isDashboard ? (
            <HStack w="100%">
              <Show above="md">
                <DashboardNavigation />
              </Show>
              <Show below="md">
                <MobileDashboardNavigation />
              </Show>
              <Component {...pageProps} />
            </HStack>
          ) : (
            <VStack w="100%">
              <MainNavigation />
              <Component {...pageProps} />
              <Footer />
            </VStack>
          )}
        </Box>
      </ChakraProvider>
    </UserProvider>
  );
}
