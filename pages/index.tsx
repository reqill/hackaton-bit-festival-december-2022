import { Heading } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Planning tool</title>
      </Head>
      <main>
        <Heading fontSize="8xl" fontWeight="semibold">
          Landing Page
          <Link href="/api/auth/login">Logout</Link>
        </Heading>
      </main>
    </div>
  );
}
