import { Circle, Heading, Icon, SimpleGrid, Text, useBoolean, VStack } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import { TodoForm } from 'src/components/TodoForm';
import { TodoList } from 'src/components/TodoList';
import { DEFAULT_TRANSITION } from 'src/constants';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useBoolean(false);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <Head>
          <title>Planning tool</title>
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
            <Heading fontWeight="semibold" fontSize="5xl" lineHeight="1" pt={3}>
              📝 Planning tool
            </Heading>
            <Text fontSize="xl" pl="4.8rem">
              Your todo list for even the hardest of tasks.
            </Text>
            <SimpleGrid pt={4} columns={[1, 1, 2, 2, 3]} gap={3}>
              <TodoList title="Personal" createNew={() => setIsDialogOpen.on()} />
              <TodoList title="Group shared" createNew={() => setIsDialogOpen.on()} />
              <TodoList title="Other" createNew={() => setIsDialogOpen.on()} />
            </SimpleGrid>
            <Circle
              position="absolute"
              bottom={6}
              right={6}
              backgroundColor="teal.300"
              size={12}
              shadow="base"
              transition={DEFAULT_TRANSITION}
              _hover={{ shadow: 'xl' }}
              cursor="pointer"
              onClick={() => setIsDialogOpen.on()}
            >
              <Icon fontSize="2xl" color="white">
                <PlusIcon />
              </Icon>
            </Circle>
          </VStack>
        </main>
      </div>
      <TodoForm open={isDialogOpen} onClose={() => setIsDialogOpen.off()} />
    </>
  );
}
