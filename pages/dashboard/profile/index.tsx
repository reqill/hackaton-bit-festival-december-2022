import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { Avatar } from 'src/components/Avatar';

export default function Profile() {
  const { user } = useUser();
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Head>
        <title>Plaatrr | Profile</title>
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
            🧍 Profile
          </Heading>
          <Text fontSize={['lg', 'lg', 'xl']} pl="3.6rem" pb={10}>
            What can we say about you?
          </Text>
          <Box
            width={400}
            backgroundColor="white"
            p={5}
            borderRadius={15}
            boxShadow="0 5px 7px rgba(0,0,0,.03)"
          >
            <Link href={`mailto:${user?.email}`}>
              <HStack>
                <Avatar name={user?.name || '??'} size={24} />
                <VStack alignItems="left" pl={5}>
                  <Heading fontWeight="semibold" fontSize={['xl', '2xl', '3xl']}>
                    {user?.name}
                  </Heading>
                  <Text fontSize={['lg', 'lg', 'xl']}>{user?.email}</Text>
                </VStack>
              </HStack>
            </Link>
          </Box>
        </VStack>
      </main>
    </div>
  );
}
