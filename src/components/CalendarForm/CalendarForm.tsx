import { Checkbox, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { Dialog } from '../Dialog';

type CalendarFormProps = {
  open: boolean;
  onClose: () => void;
  event: any; // please add a type for me :)
};

export const CalendarForm = ({ open, onClose, event }: CalendarFormProps) => {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      wholeDay: false,
      startAt: event?.day || '',
      endAt: event?.endAt || '',
    },

    onSubmit: async (values) => {
      try {
        console.log(values);
        formik.resetForm();
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
  console.log(formik.values.endAt, formik.values.startAt);

  return (
    <Dialog open={open} onClose={onClose} title="Add/inspect event" onSubmit={formik.submitForm}>
      <FormikProvider value={formik}>
        <FormControl
          display="flex"
          flexDirection="row-reverse"
          justifyContent="left"
          alignItems="center"
        >
          <FormLabel htmlFor="whole" userSelect="none">
            Whole day
          </FormLabel>
          <Checkbox
            pr={2}
            mt={-2}
            id="whole"
            name="hour"
            checked={formik.values.wholeDay}
            onChange={(e) => formik.setFieldValue('wholeDay', e.target.checked)}
          />
        </FormControl>
        <FormControl pt={2}>
          <FormLabel htmlFor="daystartat">
            Start Date <small>(inclusive)</small>
          </FormLabel>
          <Input
            mt={-1}
            id="startat"
            name="startAt"
            value={formik.values.startAt}
            type={formik.values.wholeDay ? 'date' : 'datetime-local'}
            pattern={formik.values.wholeDay ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'}
            onChange={(e) => formik.setFieldValue('startAt', e.target.value)}
          />
        </FormControl>
        <FormControl pt={2}>
          <FormLabel htmlFor="endat">
            End Date <small>(inclusive)</small>
          </FormLabel>
          <Input
            mt={-1}
            id="endAt"
            name="endAt"
            value={formik.values.endAt}
            type={formik.values.wholeDay ? 'date' : 'datetime-local'}
            pattern={formik.values.wholeDay ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'}
            onChange={(e) => formik.setFieldValue('endAt', e.target.value)}
          />
        </FormControl>
      </FormikProvider>
    </Dialog>
  );
};
