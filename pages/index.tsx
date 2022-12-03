import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Center, Heading, LinkBox, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { Footer } from 'src/components/Footer';

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <Head>
        <title>Planning tool</title>
      </Head>
      <main>
        <Center h="100vh">
          <VStack height="100%" justifyContent="center" alignItems="center" my="auto">
            <Heading fontWeight="semibold" fontSize={['4xl', '5xl', '7xl']} lineHeight="1">
              Welcome to Plaatrr
            </Heading>
            <Text fontSize={['md', 'lg', '2xl']}>The only planning tool you will ever need!</Text>
            <Text fontSize={['small', 'sm']} color="blackAlpha.200" pb={4}>
              Obviously when we leave the alpha ;p
            </Text>
            <LinkBox>
              <Link href={user ? '/dashboard' : 'api/auth/login'}>
                <Button
                  size={['md', 'lg']}
                  backgroundColor="teal.300"
                  _hover={{ backgroundColor: 'teal.200' }}
                >
                  {user ? 'Go to dashboard' : 'Sign in!'}
                </Button>
              </Link>
            </LinkBox>
          </VStack>
          <Footer />
        </Center>
      </main>
    </div>
  );
}
