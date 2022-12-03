import { Task } from '@prisma/client';
import { useFormik, Field, FormikProvider } from 'formik';
import { object, string } from 'yup';
import { Dialog } from '../Dialog';
import { Importance } from '@prisma/client';
import { mixed } from 'yup';
import { Checkbox, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { onFieldChange } from 'src/utils/forms';
import { gql } from 'apollo-server-micro';
import { useMutation } from '@apollo/client';

type TodoFormProps = {
  refetch: () => void;
  onClose: () => void;
  open: boolean;
  defaultValues?: Task;
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
export const TodoForm = ({ onClose, open, defaultValues, refetch }: TodoFormProps) => {
  const [taskMutation] = useMutation(SEND_TASK); // taskMutation({variables:{name:name,importance:{importance:ENUM}}})

  const formik = useFormik({
    initialValues: {
      name: defaultValues?.name || '',
      planned: defaultValues?.planned || false,
      startDate: defaultValues?.startDate || null,
      endDate: defaultValues?.endDate || null,
      importance: defaultValues?.importance,
    },

    validationSchema: object().shape({
      name: string().required('Task name is required'),
      planned: mixed().required('This value is required'),
      startDate: mixed(),
      endDate: mixed(),
      importance: mixed().required('Priority is required'),
    }),

    onSubmit: async (values) => {
      await taskMutation({
        variables: { ...values, importance: { importance: values.importance } },
      });
      refetch();
      formik.resetForm();
      onClose();
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
        </FormikProvider>
      </VStack>
    </Dialog>
  );
};
