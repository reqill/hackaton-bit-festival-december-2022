import { Heading, Text, VStack } from '@chakra-ui/react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Head from 'next/head';
import { Calendar } from 'src/components/Calendar';

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
    <div style={{ width: '100%', height: '100vh' }}>
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
            📅 Calendar
          </Heading>
          <Text fontSize="xl" pl="5rem">
            Schedule your life like a pro
          </Text>
          <Calendar />
        </VStack>
      </main>
    </div>
  );
}
