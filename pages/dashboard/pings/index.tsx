import { Center, Heading, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';

export default function Pings() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Head>
        <title>Plaatrr | Pings</title>
      </Head>
      <main>
        <VStack
          h="100vh"
          w="100%"
          alignItems="left"
          px={5}
          py={5}
          justifyContent="flex-start"
          position="relative"
        >
          <Heading fontWeight="semibold" fontSize={['3xl', '4xl', '5xl']} lineHeight="1" pt={3}>
            🚨 Pings
          </Heading>
          <Text fontSize={['lg', 'lg', 'xl']} pl="4.55rem">
            Communicate in real time
          </Text>
          <Center height="75%" color="blackAlpha.400">
            <Text fontSize={['lg', 'lg', 'xl']}>Kinda empty, isn&apos;t it?</Text>
          </Center>
        </VStack>
      </main>
    </div>
  );
}
