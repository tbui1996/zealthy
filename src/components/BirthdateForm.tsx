import React from 'react';
import { TextField, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface BirthdateFormProps {
  onSubmit: (values: { birthdate: string }) => void;
}

const validationSchema = Yup.object({
  birthdate: Yup.date()
    .required('Required')
    .max(new Date(), 'Birthdate cannot be in the future')
    .min(new Date(1900, 0, 1), 'Invalid birthdate'),
});

const BirthdateForm: React.FC<BirthdateFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      birthdate: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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