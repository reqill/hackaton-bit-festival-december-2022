import { Circle, Heading, Icon, SimpleGrid, Text, useBoolean, VStack } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { gql, useMutation, useQuery } from '@apollo/client';
import Head from 'next/head';
import { TodoForm } from 'src/components/TodoForm';
import { TodoList } from 'src/components/TodoList';
import { DEFAULT_TRANSITION } from 'src/constants';

const GET_TASKS = gql`
  query Query {
    me {
      tasks {
        endDate
        id
        importance
        name
        planned
        startDate
      }
      groups {
        id
        name
        tasks {
          endDate
          id
          importance
          name
          planned
          startDate
        }
      }
    }
  }
`;

const SEND_TASK = gql`
  mutation Mutation($name: String!, $importance: importanceInput!) {
    addTask(name: $name, importance: $importance) {
      id
      importance
      name
    }
  }
`;
export default function Board() {
  const [isDialogOpen, setIsDialogOpen] = useBoolean(false);
  //data.me.tasks taski indywidualne
  //data.me.groups grupy w ktorych jest user group.task - taski danej grupy
  const { data, loading, error } = useQuery(GET_TASKS); //task.planned - na godziny
  const [taskMutation] = useMutation(SEND_TASK); // taskMutation({variables:{name:name,importance:{importance:ENUM}}})

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <Head>
          <title>Plaatrr | Planning</title>
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
              📝 Planning tool
            </Heading>
            <Text fontSize={['lg', 'lg', 'xl']} pl="4.8rem">
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
