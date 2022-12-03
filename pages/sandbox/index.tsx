import { useUser } from '@auth0/nextjs-auth0/client';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

export default function Home() {
  const SEND_TASK = gql`
    mutation Mutation($name: String!, $importance: importanceInput!, $suspectedDuration: Int) {
      addTask(name: $name, importance: $importance, suspectedDuration: $suspectedDuration) {
        id
        importance
        name
        suspectedDuration
      }
    }
  `;
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
  const FIT_TASK = gql`
    mutation AddGroupTask(
      $taskId: String!
      $startDate: String!
      $endDate: String!
      $minStartTime: Int
      $maxEndTime: Int
    ) {
      findFit(
        taskId: $taskId
        startDate: $startDate
        endDate: $endDate
        minStartTime: $minStartTime
        maxEndTime: $maxEndTime
      ) {
        endDate
        id
        importance
        name
        planned
        startDate
        suspectedDuration
      }
    }
  `;

  const GROUP_FIT_TASK = gql`
    mutation Mutation(
      $taskId: String!
      $startDate: String!
      $endDate: String!
      $groupId: String!
      $minStartTime: Int
      $maxEndTime: Int
    ) {
      findGroupFit(
        taskId: $taskId
        startDate: $startDate
        endDate: $endDate
        groupId: $groupId
        minStartTime: $minStartTime
        maxEndTime: $maxEndTime
      ) {
        endDate
        id
        importance
        name
        planned
        startDate
        suspectedDuration
      }
    }
  `;

  const { user, error, isLoading } = useUser();
  const [name, setName] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [planned, setPlanned] = useState(false);

  const [groupName, setGroupName] = useState('');

  const [email, setEmail] = useState('');

  const [selectedGroup, setSelectedGroup] = useState('');

  const [suspectedDuration, setSuspectedDuration] = useState(0);

  const [taskMut, { data: dataT, loading: loadingT, error: errorMutation }] =
    useMutation(SEND_TASK);
  const [eventMut, { data: dataE, loading: loafingE, error: errorMutationE }] =
    useMutation(SEND_EVENT);

  const [taskGroupMut, { data: dataGT, loading: loadingGT, error: errorMutationG }] =
    useMutation(SEND_GROUP_TASK);
  const [eventGroupMut, { data: dataGE, loading: loafingGE, error: errorMutationGE }] =
    useMutation(SEND_GROUP_EVENT);

  const [groupCreateMut, { data: dataGC, loading: loafingGC, error: errorMutationGC }] =
    useMutation(CREATE_GROUP);

  const [addToGroupMutation] = useMutation(ADD_TO_GROUP);

  const [fitTaskMutation] = useMutation(FIT_TASK);

  const [fitGroupTaskMutation] = useMutation(GROUP_FIT_TASK);

  const { data, loading, error: errorQ } = useQuery(GET_TASKS);

  if (errorMutation) return <p>{errorMutation.message}</p>;
  if (isLoading || loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const handleChange = () => {
    setPlanned(!planned);
  };
  const sendData = () => {
    if (planned) {
      eventMut({
        variables: { name, startDate, endDate, importance: { importance: 'HIGH' } },
      });
    } else {
      taskMut({
        variables: { name, importance: { importance: 'HIGH' }, suspectedDuration },
      });
    }
  };
  const sendGroupData = () => {
    if (planned) {
      eventGroupMut({
        variables: {
          name,
          startDate,
          endDate,
          importance: { importance: 'HIGH' },
          groupId: selectedGroup,
        },
      });
    } else {
      taskGroupMut({
        variables: { name, importance: { importance: 'HIGH' }, groupId: selectedGroup },
      });
    }
  };

  const fitTask = () => {
    // const taskId = data.me.tasks.filter((t: any) => !t.planned)[0].id;
    // fitTaskMutation({
    //   variables: {
    //     taskId: taskId,
    //     startDate: '2022/12/2 23:00',
    //     endDate: '2022/12/5 23:00',
    //     minStartTime: 60 * 8,
    //     maxEndTime: 60 * 22,
    //   },
    // });

    fitGroupTaskMutation({
      variables: {
        taskId: '709ca857-8e32-4e9c-8ed3-5270e439dadf',
        groupId: '475f3371-f07f-4ba6-aacd-8c7cf7f6117b',
        startDate: '2022/12/2 23:00',
        endDate: '2022/12/5 23:00',
        minStartTime: 60 * 8,
        maxEndTime: 60 * 22,
      },
    });
  };
  return (
    <div>
      <Head>
        <title>Adams stuff</title>
      </Head>
      <main>
        <Link href={'/api/auth/login'}>Login</Link>
        Hello {user?.name}
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="name"
        />
        <input
          type="text"
          name="startDate"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          placeholder="startDate"
        />
        <input
          type="text"
          name="suspectedDuration"
          onChange={(e) => setSuspectedDuration(Number.parseInt(e.target.value))}
          value={suspectedDuration}
          placeholder="suspectedDuration"
        />
        <input
          type="text"
          name="endDate"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          placeholder="endDate"
        />
        <input type="checkbox" checked={planned} onChange={handleChange} />
        <button onClick={sendData}>Add Task</button>
        <button onClick={sendGroupData}>Add Group Task</button>
        {data?.me.tasks.map((t: any) => {
          return (
            <div key={t.id}>
              Name: {t.name} StartDate: {t.startDate} EndDate: {t.endDate} Planned: {t.planned}
              Importance: {t.importance}
            </div>
          );
        })}
        {data?.me.groups.map((group: any) => {
          return group.tasks.map((t: any) => {
            return (
              <div key={t.id}>
                Name: {t.name} StartDate: {t.startDate} EndDate: {t.endDate} Planned: {t.planned}
                Importance: {t.importance}
              </div>
            );
          });
        })}
        <input
          type="text"
          name="GroupName"
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
          placeholder="GroupName"
        />
        <button onClick={() => groupCreateMut({ variables: { name: groupName } })}>
          Create Group
        </button>
        {data?.me.groups.map((g: any) => {
          return (
            <div key={g.id}>
              Name: {g.name}
              <button
                onClick={() => {
                  setSelectedGroup(g.id);
                }}
              >
                Select
              </button>
            </div>
          );
        })}
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
        />
        <button
          onClick={() => {
            addToGroupMutation({ variables: { groupId: selectedGroup, email } });
          }}
        >
          add
        </button>
        <button
          onClick={() => {
            fitTask();
          }}
        >
          FitTask
        </button>
      </main>
    </div>
  );
}
