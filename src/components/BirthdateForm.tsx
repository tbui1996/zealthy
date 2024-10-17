import React, { useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useUpdateUser from '../mutations/useUpdateUser';

interface BirthdateFormProps {
  userId: string;
  onSubmit: (data: { birthdate: string }) => void;
}

const validationSchema = Yup.object({
  birthdate: Yup.date()
    .required('Required')
    .max(new Date(), 'Birthdate cannot be in the future')
    .min(new Date(1900, 0, 1), 'Invalid birthdate'),
});

const BirthdateForm: React.FC<BirthdateFormProps> = ({ userId, onSubmit }) => {
  const updateUser = useUpdateUser();

  const formik = useFormik({
    initialValues: {
      birthdate: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUser.mutateAsync({
          id: userId,
          birthdate: values.birthdate,
        });
        onSubmit(values);
      } catch (err) {
        console.error('Error updating birthday:', err);
        // Handle error (e.g., show error message to user)
      }
    },
  });

  useEffect(() => {
    if (formik.isValid && formik.dirty) {
      formik.submitForm();
    }
  }, [formik.values]);

  return (
    <form>
      <Box mb={2}>
        <TextField
          fullWidth
          id="birthdate"
          name="birthdate"
          label="Birthdate"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.birthdate}
          onChange={formik.handleChange}
          error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
          helperText={formik.touched.birthdate && formik.errors.birthdate}
        />
      </Box>
    </form>
  );
};

export default BirthdateForm;