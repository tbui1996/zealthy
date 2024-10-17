import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useUpdateUser from '../mutations/useUpdateUser';

interface AboutMeFormProps {
  userId: string;
  onSubmit: (data: { aboutMe: string }) => void;
}

const validationSchema = Yup.object({
  aboutMe: Yup.string().required('Required'),
});

const AboutMeForm: React.FC<AboutMeFormProps> = ({ userId, onSubmit }) => {
  const updateUser = useUpdateUser();

  const formik = useFormik({
    initialValues: {
      aboutMe: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUser.mutateAsync({
          id: userId,
          aboutMe: values.aboutMe,
        });
        onSubmit(values);
      } catch (error) {
        console.error('Error updating about me:', error);
        // Handle error (e.g., show error message to user)
      }
    },
  });

  React.useEffect(() => {
    if (formik.isValid && formik.dirty) {
      formik.submitForm();
    }
  }, [formik.values]);

  return (
    <form>
      <Typography variant="h6" gutterBottom>
        Tell us about yourself
      </Typography>
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