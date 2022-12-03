import { Heading, Skeleton, Text, VStack } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Calendar } from 'src/components/Calendar';
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

export default function Home() {
  //data.me.tasks taski indywidualne
  //data.me.groups grupy w ktorych jest user group.task - taski danej grupy
  const { data, loading, error } = useQuery(GET_TASKS); //task.planned - na godziny

  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (!loading) {
      const tasks = data.me.tasks?.filter((t: Task) => t.planned);
      data.me.groups.forEach((g: any) => {
        tasks.push(...g.tasks?.filter((t: Task) => t.planned));
      });
      setEvents(
        tasks.map((t: Task) => {
          if (t.startDate && t.endDate) {
            const startDateObj: Date = new Date(t.startDate);
            const endDateObj: Date = new Date(t.endDate);
            return {
              id: t.id,
              startAt: startDateObj,
              endAt: endDateObj,
              summary: t.name,
              color: '#FF0000',
              allDay: false,
              // style: {
              //   textDecoration: 'line-through',
              //   border: 'solid 1px red',
              //   background: 'white',
              //   color: 'black',
              // },
            };
          }
        })
      );
    }
  }, [data]);
  useEffect(() => {
    console.log(events);
  }, [events]);
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

          <Skeleton isLoaded={!loading} borderRadius={15} height="100%">
            <Calendar events={events} />
          </Skeleton>
        </VStack>
      </main>
    </div>
  );
}
