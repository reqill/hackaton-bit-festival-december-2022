import { Center, Heading } from '@chakra-ui/react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Head from 'next/head';

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
export default function Home() {
  //data.me.tasks taski indywidualne
  //data.me.groups grupy w ktorych jest user group.task - taski danej grupy
  const { data, loading, error } = useQuery(GET_TASKS); //task.planned - na godziny
  const [taskMutation] = useMutation(SEND_TASK); // taskMutation({variables:{name:name,importance:{importance:ENUM}}})

  return (
    <div>
      <Head>
        <title>Planning tool</title>
      </Head>
      <main>
        <Center height="100vh" maxH="100vh" width="100vw" maxW="100vw" backgroundColor="gray.100">
          <Heading fontSize="8xl" fontWeight="semibold">
            Todo list
          </Heading>
        </Center>
      </main>
    </div>
  );
}
