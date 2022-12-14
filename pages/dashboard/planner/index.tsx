import { Circle, Heading, Icon, SimpleGrid, Text, useBoolean, VStack } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { TodoForm } from 'src/components/TodoForm';
import { TodoList } from 'src/components/TodoList';
import { DEFAULT_TRANSITION } from 'src/constants';
import { useEffect, useState } from 'react';
import { Task } from '@prisma/client';

const GET_TASKS = gql`
  query Query {
    me {
      tasks {
        endDate
        id
        importance
        taskType
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
          taskType
          name
          planned
          startDate
        }
      }
    }
  }
`;

export default function Planner() {
  const [isDialogOpen, setIsDialogOpen] = useBoolean(false);
  //data.me.tasks taski indywidualne
  //data.me.groups grupy w ktorych jest user group.task - taski danej grupy
  const { data, loading, error, refetch } = useQuery(GET_TASKS); //task.planned - na godziny
  const [tasksPersonal, setTasksPersonal] = useState([]);
  const [tasksGroup, setTasksGroup] = useState([]);

  useEffect(() => {
    if (!loading) {
      const personalTasks = data.me.tasks?.filter((t: Task) => !t.planned);
      setTasksPersonal(personalTasks);
      const groupTasks: any = [];
      if (data.me.groups) {
        data.me.groups.forEach((g: any) => {
          const groupTasksWithName = g.tasks.map((t: Task) => ({ ...t, groupName: g.name }));
          const filteredTaskWithName = groupTasksWithName.filter((t: Task) => !t.planned);
          groupTasks.push(...filteredTaskWithName);
        });
      }
      setTasksGroup(groupTasks);
    }
  }, [data]);

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
              ???? Planning tool
            </Heading>
            <Text fontSize={['lg', 'lg', 'xl']} pl="4.8rem">
              Your todo list for even the hardest of tasks.
            </Text>
            <SimpleGrid pt={4} columns={[1, 1, 2, 2, 3]} gap={3}>
              <TodoList
                data={tasksPersonal}
                title="Personal"
                createNew={() => setIsDialogOpen.on()}
              />
              <TodoList
                data={tasksGroup}
                title="Group shared"
                createNew={() => setIsDialogOpen.on()}
              />
              <TodoList data={undefined} title="Other" createNew={() => setIsDialogOpen.on()} />
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
      <TodoForm
        refetch={refetch}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen.off()}
        groups={data?.me.groups}
      />
    </>
  );
}
