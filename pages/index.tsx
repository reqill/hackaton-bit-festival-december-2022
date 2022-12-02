import { Center, GridItem, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { SimpleCard } from 'src/components/SimpleCard';
import { techInfo } from 'src/data/homoePageContent';

export default function Home() {
  return (
    <div>
      <Head>
        <title>NextJS Typescript ChakraUI template</title>
      </Head>
      <main>
        <Center height="100vh" maxH="100vh" width="100vw" maxW="100vw" backgroundColor="gray.100">
          <VStack>
            <Heading fontSize="8xl" fontWeight="semibold">
              Template
            </Heading>
            <Text fontSize="2xl">Using Next.js, Typescript and Chakra-UI</Text>
            <SimpleGrid columns={3} gap={7} pt={12}>
              {techInfo.map((tech, index) => (
                <GridItem key={index}>
                  <SimpleCard {...tech} />
                </GridItem>
              ))}
            </SimpleGrid>
          </VStack>
        </Center>
      </main>
    </div>
  );
}
