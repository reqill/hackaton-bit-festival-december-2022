import { FormikContextType } from 'formik';

export const onFieldChange = async <Values>(
  formik: FormikContextType<Values>,
  field: keyof Values & string,
  value: Values[typeof field]
) => {
  return Promise.all([formik.setFieldValue(field, value), formik.setFieldTouched(field)]).then(
    () => {
      formik.validateField(field);
    }
  );
};
