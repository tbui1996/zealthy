import React from 'react';
import { TextField, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface AboutMeFormProps {
  onSubmit: (values: { aboutMe: string }) => void;
}

const validationSchema = Yup.object({
  aboutMe: Yup.string().required('Required'),
});

const AboutMeForm: React.FC<AboutMeFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      aboutMe: '',
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
          id="aboutMe"
          name="aboutMe"
          label="About Me"
          multiline
          rows={4}
          value={formik.values.aboutMe}
          onChange={formik.handleChange}
          error={formik.touched.aboutMe && Boolean(formik.errors.aboutMe)}
          helperText={formik.touched.aboutMe && formik.errors.aboutMe}
        />
      </Box>
    </form>
  );
};

export default AboutMeForm;