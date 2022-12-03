import { useFormik, Field, FormikProvider } from 'formik';
import { object, string } from 'yup';
import { Dialog } from '../Dialog';
import { Importance } from '@prisma/client';
import { mixed } from 'yup';
import { Checkbox, FormControl, FormLabel, Input, useToast, VStack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { onFieldChange } from 'src/utils/forms';
import { gql } from 'apollo-server-micro';
import { useMutation } from '@apollo/client';
import { FrontTaskType } from '../TodoList';
import { number } from 'yup';
import { useState } from 'react';
const TaskType = {
  SCHOOL: 'SCHOOL',
  WORK: 'WORK',
  FRIENDS: 'FRIENDS',
  FAMILY: 'FAMILY',
};
type TodoFormProps = {
  refetch: () => void;
  onClose: () => void;
  open: boolean;
  defaultValues?: FrontTaskType;
  groups?: { id: string; name: string }[];
};
const SEND_TASK = gql`
  mutation Mutation(
    $name: String!
    $importance: importanceInput!
    $taskType: typeInput!
    $suspectedDuration: Int
  ) {
    addTask(
      name: $name
      importance: $importance
      taskType: $taskType
      suspectedDuration: $suspectedDuration
    ) {
      endDate
      id
      importance
      name
      planned
      startDate
      suspectedDuration
      taskType
    }
  }
`;
const SEND_GROUP_TASK = gql`
  mutation Mutation(
    $name: String!
    $importance: importanceInput!
    $taskType: typeInput!
    $groupId: String!
  ) {
    addGroupTask(name: $name, importance: $importance, taskType: $taskType, groupId: $groupId) {
      endDate
      id
      importance
      name
      planned
      startDate
      suspectedDuration
      taskType
    }
  }
`;
const SEND_EVENT = gql`
  mutation Mutation(
    $name: String!
    $importance: importanceInput!
    $taskType: typeInput!
    $startDate: String!
    $endDate: String!
  ) {
    addEvent(
      name: $name
      importance: $importance
      taskType: $taskType
      startDate: $startDate
      endDate: $endDate
    ) {
      endDate
      id
      importance
      name
      planned
      startDate
      suspectedDuration
      taskType
    }
  }
`;
const SEND_GROUP_EVENT = gql`
  mutation Mutation(
    $name: String!
    $importance: importanceInput!
    $taskType: typeInput!
    $startDate: String!
    $endDate: String!
    $groupId: String!
  ) {
    addGroupEvent(
      name: $name
      importance: $importance
      taskType: $taskType
      startDate: $startDate
      endDate: $endDate
      groupId: $groupId
    ) {
      endDate
      id
      importance
      name
      planned
      suspectedDuration
      taskType
      startDate
    }
  }
`;

export const TodoForm = ({ onClose, open, defaultValues, refetch, groups }: TodoFormProps) => {
  const [taskMutation] = useMutation(SEND_TASK);
  const [eventMutation] = useMutation(SEND_EVENT);

  const [taskGroupMutation] = useMutation(SEND_GROUP_TASK);
  const [eventGroupMutation] = useMutation(SEND_GROUP_EVENT);

  const [id, setId] = useState('');

  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: defaultValues?.name || '',
      planned: defaultValues?.planned || false,
      startDate: defaultValues?.startDate || null,
      endDate: defaultValues?.endDate || null,
      importance: defaultValues?.importance,
      duration: 0,
      group: defaultValues?.groupName || null,
      taskType: defaultValues?.taskType || null,
    },

    validationSchema: object().shape({
      name: string().required('Task name is required'),
      planned: mixed().required('This value is required'),
      startDate: mixed(),
      duration: number(),
      endDate: mixed(),
      importance: mixed().required('Priority is required'),
    }),

    onSubmit: async (values) => {
      try {
        if (values.planned) {
          if (id) {
            console.log(id);
            await eventGroupMutation({
              variables: {
                ...values,
                groupId: id,
                importance: { importance: values.importance },
                taskType: { taskType: values.taskType },
              },
            });
          }
          await eventMutation({
            variables: {
              ...values,
              importance: { importance: values.importance },
              taskType: { taskType: values.taskType },
            },
          });
        } else {
          if (id) {
            await taskGroupMutation({
              variables: {
                ...values,
                groupId: id,
                suspectedDuration: values.duration,
                importance: { importance: values.importance },
                taskType: { taskType: values.taskType },
              },
            });
          }
          await taskMutation({
            variables: {
              ...values,
              suspectedDuration: values.duration,
              importance: { importance: values.importance },
              taskType: { taskType: values.taskType },
            },
          });
        }

        refetch();
        formik.resetForm();
        onClose();
      } catch (e: any) {
        toast({
          position: 'bottom-left',
          description: e.message,
          status: 'error',
          duration: 2500,
          isClosable: false,
        });
      }
    },
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      title="Add a new item"
      onSubmit={() => formik.submitForm()}
      submitDisabled={!formik.isValid}
    >
      <VStack>
        <FormikProvider value={formik}>
          <FormControl>
            <FormLabel mb=".1rem" htmlFor="task-name">
              Task name
            </FormLabel>
            <Field as={Input} id="task-name" name="name" type="text" variant="filled" />
          </FormControl>
          <FormControl>
            <FormLabel mb=".1rem" htmlFor="planned">
              Is planned?
            </FormLabel>
            <Field
              as={Checkbox}
              id="planned"
              name="planned"
              variant="filled"
              onChange={(e: any) => onFieldChange(formik, 'planned', e.target.checked)}
            />
          </FormControl>
          <FormControl isDisabled={!formik.values.planned}>
            <FormLabel mb=".1rem" htmlFor="start-date">
              Start date <small>(optional)</small>
            </FormLabel>
            <Field
              as={Input}
              id="start-date"
              name="startDate"
              type="datetime-local"
              pattern="yyyy-MM-dd HH:mm"
              variant="filled"
            />
          </FormControl>
          <FormControl isDisabled={!formik.values.planned}>
            <FormLabel mb=".1rem" htmlFor="end-date">
              End date <small>(optional)</small>
            </FormLabel>
            <Field
              as={Input}
              id="end-date"
              name="endDate"
              type="datetime-local"
              pattern="yyyy-MM-dd HH:mm"
              variant="filled"
            />
          </FormControl>
          <FormControl isDisabled={formik.values.planned}>
            <FormLabel mb=".1rem" htmlFor="duration">
              Duration
            </FormLabel>
            <Field as={Input} id="duration" name="duration" type="number" variant="filled" />
          </FormControl>
          <FormControl>
            <FormLabel mb=".1rem" htmlFor="priority">
              Priority level
            </FormLabel>
            <Field
              as={Select}
              options={[
                { value: Importance.LOW, label: 'Low' },
                { value: Importance.MEDIUM, label: 'Medium' },
                { value: Importance.HIGH, label: 'High' },
                { value: Importance.CRITICAL, label: 'Critical' },
              ]}
              onChange={({ value }: any) => formik.setFieldValue('importance', value)}
              id="priority"
              name="priority"
              variant="filled"
            />
          </FormControl>
          <FormControl>
            <FormLabel mb=".1rem" htmlFor="taskType">
              Task type
            </FormLabel>
            <Field
              as={Select}
              options={[
                { value: TaskType.FAMILY, label: 'Family' },
                { value: TaskType.FRIENDS, label: 'Friends' },
                { value: TaskType.SCHOOL, label: 'School' },
                { value: TaskType.WORK, label: 'Work' },
              ]}
              onChange={({ value }: any) => formik.setFieldValue('taskType', value)}
              id="priority"
              name="priority"
              variant="filled"
            />
          </FormControl>
          <FormControl isDisabled={!groups}>
            <FormLabel mb=".1rem" htmlFor="groupId">
              Group
            </FormLabel>
            <Field
              as={Select}
              value={formik.values.group}
              options={
                groups ? [...groups!.map((group) => ({ value: group.id, label: group.name }))] : []
              }
              onChange={({ value }: any) => {
                setId(value);
                formik.setFieldValue('group', value);
              }}
              id="group"
              name="group"
              variant="filled"
            />
          </FormControl>
        </FormikProvider>
      </VStack>
    </Dialog>
  );
};
