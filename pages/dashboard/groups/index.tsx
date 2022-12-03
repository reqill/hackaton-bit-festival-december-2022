import { Heading } from '@chakra-ui/react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Head from 'next/head';
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
export default function Home() {
  const { data, loading, error } = useQuery(GET_GROUPS);

  const [taskGroupMut] = useMutation(SEND_GROUP_TASK); //jak dla indywidualnych dylko musisz podać groupId

  const [eventGroupMut] = useMutation(SEND_GROUP_EVENT); //jak dla indywidualnych dylko musisz podać groupId

  const [groupCreateMut] = useMutation(CREATE_GROUP); //podajesz name i tyle

  const [addToGroupMutation] = useMutation(ADD_TO_GROUP); // podajesz email i groupId

  return (
    <div>
      <Head>
        <title>Planning tool</title>
      </Head>
      <main>
        <Heading fontSize="8xl" fontWeight="semibold">
          Groups
        </Heading>
      </main>
    </div>
  );
}
