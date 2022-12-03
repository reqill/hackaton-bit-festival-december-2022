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
const taskType = {
  SCHOOL: 'SCHOOL',
  WORK: 'WORK',
  FRIENDS: 'FRIENDS',
  FAMILY: 'FAMILY',
};

export const TodoForm = ({ onClose, open, defaultValues, refetch, groups }: TodoFormProps) => {
  const [taskMutation] = useMutation(SEND_TASK); // taskMutation({variables:{name:name,importance:{importance:ENUM}}})
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: defaultValues?.name || '',
      planned: defaultValues?.planned || false,
      startDate: defaultValues?.startDate || null,
      endDate: defaultValues?.endDate || null,
      importance: defaultValues?.importance,
      group: defaultValues?.groupName || null,
      taskType: defaultValues?.taskType || null,
    },

    validationSchema: object().shape({
      name: string().required('Task name is required'),
      planned: mixed().required('This value is required'),
      startDate: mixed(),
      endDate: mixed(),
      importance: mixed().required('Priority is required'),
    }),

    onSubmit: async (values) => {
      try {
        await taskMutation({
          variables: {
            ...values,
            importance: { importance: values.importance },
            taskType: { taskType: values.taskType },
          },
        });
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
            <Field as={Input} id="start-date" name="startDate" type="date" variant="filled" />
          </FormControl>
          <FormControl isDisabled={!formik.values.planned}>
            <FormLabel mb=".1rem" htmlFor="end-date">
              End date <small>(optional)</small>
            </FormLabel>
            <Field as={Input} id="end-date" name="endDate" type="date" variant="filled" />
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
                { value: taskType.FAMILY, label: 'Family' },
                { value: taskType.FRIENDS, label: 'Friends' },
                { value: taskType.SCHOOL, label: 'School' },
                { value: taskType.WORK, label: 'Work' },
              ]}
              onChange={({ value }: any) => formik.setFieldValue('taskType', taskType)}
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
              options={[...groups!.map((group) => ({ value: group.id, label: group.name }))]}
              onChange={({ value }: any) => formik.setFieldValue('groupName', value)}
              id="group"
              name="groupId"
              variant="filled"
            />
          </FormControl>
        </FormikProvider>
      </VStack>
    </Dialog>
  );
};
