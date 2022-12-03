import { Heading } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Planning tool</title>
      </Head>
      <main>
        <Heading fontSize="8xl" fontWeight="semibold">
          User page
        </Heading>
      </main>
    </div>
  );
}
