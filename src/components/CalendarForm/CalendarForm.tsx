import { Checkbox, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { Dialog } from '../Dialog';

type CalendarFormProps = {
  open: boolean;
  onClose: () => void;
  event: any; // please add a type for me :)
};

export const CalendarForm = ({ open, onClose, event }: CalendarFormProps) => {
  const formik = useFormik({
    initialValues: {
      hour: event?.hour || '',
      day: event?.day || '',
      duration: 0,
      wholeDay: false,
      startAt: event?.startAt || '',
      endAt: event?.endAt || '',
    },
    onSubmit: async (values) => {
      // cal api or sth
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} title="Add/inspect event" onSubmit={formik.submitForm}>
      <FormikProvider value={formik}>
        <FormControl
          display="flex"
          flexDirection="row-reverse"
          justifyContent="left"
          alignItems="center"
        >
          <FormLabel htmlFor="whole">Whole day</FormLabel>
          <Checkbox
            pr={2}
            mt={-2}
            id="whole"
            name="hour"
            checked={formik.values.wholeDay}
            onChange={(e) => formik.setFieldValue('wholeDay', e.target.checked)}
          />
        </FormControl>
        <HStack>
          <FormControl isDisabled={formik.values.wholeDay}>
            <FormLabel htmlFor="day">Hour</FormLabel>
            <Input
              mt={-1}
              id="hour"
              name="hour"
              value={formik.values.hour}
              type="time"
              pattern="HH:mm"
              onChange={(e) => formik.setFieldValue('hour', e.target.value)}
            />
          </FormControl>
          <FormControl isDisabled={formik.values.wholeDay}>
            <FormLabel htmlFor="duration">
              Duration <small>(in minutes)</small>
            </FormLabel>
            <Input
              mt={-1}
              id="duration"
              name="duration"
              value={formik.values.duration}
              type="number"
              onChange={(e) => formik.setFieldValue('duration', e.target.value)}
            />
          </FormControl>
        </HStack>
        <FormControl pt={2} isDisabled={formik.values.wholeDay}>
          <FormLabel htmlFor="day">Day</FormLabel>
          <Input
            mt={-1}
            id="day"
            name="date"
            value={formik.values.day}
            type="date"
            pattern="yyyy-MM-dd"
            onChange={(e) => formik.setFieldValue('day', e.target.value)}
          />
        </FormControl>

        <FormControl pt={2} isDisabled={!formik.values.wholeDay}>
          <FormLabel htmlFor="daystartat">
            Start Date <small>(inclusive)</small>
          </FormLabel>
          <Input
            mt={-1}
            id="startat"
            name="startAt"
            value={formik.values.startAt}
            type="datetime"
            pattern="yyyy-MM-dd HH:mm"
            onChange={(e) => formik.setFieldValue('startAt', e.target.value)}
          />
        </FormControl>
        <FormControl pt={2} isDisabled={!formik.values.wholeDay}>
          <FormLabel htmlFor="endat">
            End Date <small>(inclusive)</small>
          </FormLabel>
          <Input
            mt={-1}
            id="endAt"
            name="endAt"
            value={formik.values.endAt}
            type="datetime"
            pattern="yyyy-MM-dd HH:mm"
            onChange={(e) => formik.setFieldValue('endAt', e.target.value)}
          />
        </FormControl>
      </FormikProvider>
    </Dialog>
  );
};
