import Head from 'next/head';
import ToDoTask from 'src/theme/components/ToDoTask/ToDoTask';
import { Grid } from '@chakra-ui/react';

type TaskType = {
  id: number;
  name: string;
  tag?: string;
  planned: boolean;
  startDate: string;
  endDate: string;
  users: any[];
  importance: number;
};

const data: Array<TaskType> = [
  {
    id: 0,
    name: 'zrobic to-do liste 1',
    tag: 'szkoła',
    planned: true,
    startDate: '',
    endDate: '',
    users: [],
    importance: 3,
  },
  {
    id: 1,
    name: 'zrobic to-do liste 2',
    planned: true,
    startDate: '',
    endDate: '',
    users: [],
    importance: 2,
  },
  {
    id: 2,
    name: 'zrobic to-do liste 3',
    planned: true,
    startDate: '',
    endDate: '',
    users: [],
    importance: 1,
  },
  {
    id: 3,
    name: 'zrobic to-do liste 4',
    planned: true,
    startDate: '',
    endDate: '',
    users: [],
    importance: 3,
  },
  {
    id: 4,
    name: 'zrobic to-do liste 5',
    planned: true,
    startDate: '',
    endDate: '',
    users: [],
    importance: 2,
  },
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Planning tool</title>
      </Head>
      <Grid>
        {data.map((task) => (
          <ToDoTask key={task.id} task={task} />
        ))}
      </Grid>
    </div>
  );
}
