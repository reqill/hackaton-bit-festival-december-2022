import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { onFieldChange } from 'src/utils/forms';
import { array, object, string } from 'yup';
import { Dialog } from '../Dialog';

type GroupFormProps = {
  open: boolean;
  onClose: () => void;
  defName?: string;
};
export const GroupForm = ({ open, onClose, defName }: GroupFormProps) => {
  const [addedUsers, setAddedUsers] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      users: [],
      currentUser: '',
    },
    validationSchema: object().shape({
      name: string().required('Name is required'),
      users: array(),
      currentUser: string(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      formik.resetForm();
      onClose();
    },
  });

  useEffect(() => {
    onFieldChange(formik, 'name', defName || '');
  }, []);

  useEffect(() => {
    // @ts-ignore
    onFieldChange(formik, 'users', addedUsers);
  }, [addedUsers]);

  const options = [
    { value: 'fsdfsdcvsdc', label: 'Person 1' },
    { value: 'erf43f3fsd', label: 'Person 2' },
    { value: 'fsdvc4f3', label: 'Person 3' },
    { value: 'fsdf4f3', label: 'Person 4' },
    { value: 'fsdfdsfc4f3', label: 'Person 5' },
  ];

  return (
    <Dialog
      onClose={onClose}
      open={open}
      title={defName ? 'Edit group' : 'Create group'}
      onSubmit={() => formik.submitForm()}
      submitDisabled={!formik.isValid}
    >
      <VStack>
        <FormikProvider value={formik}>
          <FormControl>
            <FormLabel mb=".1rem" htmlFor="group-name">
              Group name
            </FormLabel>
            <Input
              id="group-name"
              name="name"
              type="text"
              variant="filled"
              value={formik.values.name}
              onChange={(e) => onFieldChange(formik, 'name', e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mb=".1rem" htmlFor="people">
              People
            </FormLabel>
            <HStack>
              <Input
                id="people"
                name="people"
                type="text"
                value={formik.values.currentUser}
                variant="filled"
                onChange={(e) => onFieldChange(formik, 'currentUser', e.target.value)}
              />
              <Button
                onClick={() => {
                  setAddedUsers((prev) => [...prev, formik.values.currentUser]);
                  onFieldChange(formik, 'currentUser', '');
                }}
              >
                Add
              </Button>
            </HStack>
          </FormControl>
          <Stack width="100%" direction="row" flexWrap="wrap" rowGap={2} pt={2}>
            {addedUsers.map((user, i) => (
              <Tag width="min" key={i}>
                <TagLabel>{user}</TagLabel>
                <TagCloseButton
                  onClick={() => setAddedUsers((prev) => [...prev.filter((el) => el !== user)])}
                />
              </Tag>
            ))}
          </Stack>
        </FormikProvider>
      </VStack>
    </Dialog>
  );
};
