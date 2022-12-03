import { Center, Heading } from '@chakra-ui/react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Head from 'next/head';
const SEND_EVENT = gql`
  mutation Mutation(
    $name: String!
    $importance: importanceInput!
    $startDate: String!
    $endDate: String!
  ) {
    addEvent(name: $name, importance: $importance, startDate: $startDate, endDate: $endDate) {
      id
      endDate
      importance
      name
      planned
      startDate
    }
  }
`;
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
export default function Home() {
  //data.me.tasks taski indywidualne
  //data.me.groups grupy w ktorych jest user group.task - taski danej grupy
  const { data, loading, error } = useQuery(GET_TASKS); //task.planned - na godziny
  const [eventMutation] = useMutation(SEND_EVENT); // eventMutation({variables:{to co w sendTask startDate,endDate}})
  return (
    <div>
      <Head>
        <title>Planning tool</title>
      </Head>
      <main>
        <Center height="100vh" maxH="100vh" width="100vw" maxW="100vw" backgroundColor="gray.100">
          <Heading fontSize="8xl" fontWeight="semibold">
            Calendar
          </Heading>
        </Center>
      </main>
    </div>
  );
}
