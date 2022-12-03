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

export default function CalendarPage() {
  //data.me.tasks taski indywidualne
  //data.me.groups grupy w ktorych jest user group.task - taski danej grupy
  const { data, loading, error } = useQuery(GET_TASKS); //task.planned - na godziny
  const [eventMutation] = useMutation(SEND_EVENT); // eventMutation({variables:{to co w sendTask startDate,endDate}})

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Head>
        <title>Plaatrr | Calendar</title>
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
            📅 Calendar
          </Heading>
          <Text fontSize={['lg', 'lg', 'xl']} pl="4.8rem">
            Schedule your life like a pro
          </Text>
          <Calendar />
        </VStack>
      </main>
    </div>
  );
}
