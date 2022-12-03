import { useUser } from '@auth0/nextjs-auth0/client';
import { GridItem, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { DashboardCard } from 'src/components/DashboardCard';

export default function Home() {
  const { user } = useUser();

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Head>
        <title>Planning tool</title>
      </Head>
      <main>
        <VStack maxH="100vh" w="100%" alignItems="left" px={5} py={7} justifyContent="flex-start">
          <Heading fontWeight="semibold" fontSize="5xl" lineHeight="1">
            👋 Welcome back, {user?.name || 'mate'}
          </Heading>
          <Text fontSize="xl" pl="4.8rem">
            Check out your summary
          </Text>
          <SimpleGrid
            columns={[1, 2]}
            height="100%"
            width="100%"
            pl={[0, 8]}
            pt={10}
            justifyItems="stretch"
            alignItems="stretch"
            gap={10}
          >
            <GridItem w="100%" h="100%">
              <DashboardCard
                title="Calendar"
                description="Your schedule"
                path="/dashboard/calendar"
              >
                <></>
              </DashboardCard>
            </GridItem>
            <GridItem w="100%" h="100%">
              <DashboardCard title="Board" description="Your todo-list" path="/dashboard/board">
                <></>
              </DashboardCard>
            </GridItem>
            <GridItem w="100%" h="100%">
              <DashboardCard
                title="Groups"
                description="Your friends and collegues"
                path="/dashboard/groups"
              >
                <></>
              </DashboardCard>
            </GridItem>
            <GridItem w="100%" h="100%">
              <DashboardCard title="Pings" description="What's live?" path="/dashboard/pings">
                <></>
              </DashboardCard>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </main>
    </div>
  );
}
