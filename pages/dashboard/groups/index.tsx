import {
  Box,
  Center,
  GridItem,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Head from 'next/head';
import { GroupCard } from 'src/components/GroupCard';
import { DEFAULT_TRANSITION } from 'src/constants';
import React from 'react';
import { GroupForm } from 'src/components/GroupForm';
const SEND_GROUP_TASK = gql`
  mutation AddGroupTask($name: String!, $importance: importanceInput!, $groupId: String!) {
    addGroupTask(name: $name, importance: $importance, groupId: $groupId) {
      id
      importance
      name
      planned
    }
  }
`;
const SEND_GROUP_EVENT = gql`
  mutation Mutation(
    $name: String!
    $importance: importanceInput!
    $startDate: String!
    $endDate: String!
    $groupId: String!
  ) {
    addGroupEvent(
      name: $name
      importance: $importance
      startDate: $startDate
      endDate: $endDate
      groupId: $groupId
    ) {
      endDate
      id
      importance
      name
      planned
      startDate
    }
  }
`;
const CREATE_GROUP = gql`
  mutation Mutation($name: String!) {
    createGroup(name: $name) {
      name
      id
    }
  }
`;
const ADD_TO_GROUP = gql`
  mutation AddGroupTask($email: String!, $groupId: String!) {
    addToGroup(email: $email, groupId: $groupId) {
      name
      id
    }
  }
`;
const GET_GROUPS = gql`
  query Query {
    me {
      groups {
        id
        name
      }
    }
  }
`;

const test: any = [
  {
    name: 'name1',
    users: [
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
    ],
  },
  {
    name: 'name2',
    users: [
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      ,
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
    ],
  },
  {
    name: 'name3',
    users: [{ name: 'Some Name' }, { name: 'Some Name' }, { name: 'Some Name' }],
  },
  {
    name: 'name4',
    users: [
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
    ],
  },
  {
    name: 'name5',
    users: [
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      ,
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
      { name: 'Some Name' },
    ],
  },
  {
    name: 'name6',
    users: [{ name: 'Some Name' }, { name: 'Some Name' }, { name: 'Some Name' }],
  },
];

export default function Groups() {
  const [isFormOpened, setIsFormOpened] = React.useState(false);
  const [actualGroup, setActualGroup] = React.useState('');
  const { data, loading, error } = useQuery(GET_GROUPS);

  const [taskGroupMut] = useMutation(SEND_GROUP_TASK); //jak dla indywidualnych dylko musisz podać groupId

  const [eventGroupMut] = useMutation(SEND_GROUP_EVENT); //jak dla indywidualnych dylko musisz podać groupId

  const [groupCreateMut] = useMutation(CREATE_GROUP); //podajesz name i tyle

  const [addToGroupMutation] = useMutation(ADD_TO_GROUP); // podajesz email i groupId

  const createNewGroup = (x?: string) => {
    setActualGroup(x || '');
    setIsFormOpened(true);
  };

  return (
    <>
      <div style={{ width: '100%', height: '100vh' }}>
        <Head>
          <title>Plaatrr | Groups</title>
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
              👪 Groups
            </Heading>
            <Text fontSize={['lg', 'lg', 'xl']} pl={['1rem', '3.8rem', '5rem']}>
              Connect with your friends and collegues
            </Text>
            <SimpleGrid pt={5} columns={[1, 1, 2, 3, 4]} gap={3} width="100%">
              {test.map((group: any, i: number) => (
                <Skeleton isLoaded={!loading} key={`group-key-${i}`} width="100%" borderRadius={10}>
                  <GridItem width="100%">
                    <GroupCard {...group} addPerson={createNewGroup} />
                  </GridItem>
                </Skeleton>
              ))}
              <GridItem width="100%">
                <Box
                  width="100%"
                  height={120}
                  borderRadius={10}
                  px={5}
                  pb={4}
                  pt={5}
                  cursor="pointer"
                  borderStyle="dashed"
                  onClick={() => createNewGroup()}
                  borderWidth="2px"
                  borderColor="gray.300"
                  transition={DEFAULT_TRANSITION}
                  _hover={{ borderColor: 'gray.400', backgroundColor: 'gray.100' }}
                >
                  <Center height="100%" width="100%">
                    <Text
                      fontWeight="semibold"
                      transition={DEFAULT_TRANSITION}
                      color="gray.500"
                      _hover={{ color: 'gray.600' }}
                    >
                      Add a new group
                    </Text>
                  </Center>
                </Box>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </main>
      </div>
      <GroupForm open={isFormOpened} onClose={() => setIsFormOpened(false)} defName={actualGroup} />
    </>
  );
}
