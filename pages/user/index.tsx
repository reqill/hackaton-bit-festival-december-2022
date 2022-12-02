import { Center, Heading } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Planning tool</title>
      </Head>
      <main>
        <Center height="100vh" maxH="100vh" width="100vw" maxW="100vw" backgroundColor="gray.100">
          <Heading fontSize="8xl" fontWeight="semibold">
            User page
          </Heading>
        </Center>
      </main>
    </div>
  );
}
