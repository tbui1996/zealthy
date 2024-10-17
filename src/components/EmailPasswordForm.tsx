import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useCreateUser from '../mutations/useCreateUser';

interface EmailPasswordFormProps {
  onSuccess: (userId: string) => void;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
});

const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({ onSuccess }) => {
  const createUser = useCreateUser();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await createUser.mutateAsync({
          email: values.email,
          password: values.password,
        });
        onSuccess(response.data.id);
      } catch (error) {
        console.error('Error creating user:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mb={2}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Box>
      <Button color="primary" variant="contained" fullWidth type="submit" disabled={formik.isSubmitting}>
        Create Account
      </Button>
    </form>
  );
};

export default EmailPasswordForm;