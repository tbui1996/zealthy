import React, { useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useUpdateUser from '../mutations/useUpdateUser';

interface AddressFormProps {
  userId: string;
  onSubmit: (data: { 
    street: string;
    city: string;
    state: string;
    zip: string;
  }) => void;
}

const validationSchema = Yup.object({
  street: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zip: Yup.string().required('Required').matches(/^\d{5}$/, 'Invalid ZIP code'),
});

const AddressForm: React.FC<AddressFormProps> = ({ userId, onSubmit }) => {
  const updateUser = useUpdateUser();

  const formik = useFormik({
    initialValues: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUser.mutateAsync({
          id: userId,
          address: {
            street: values.street,
            city: values.city,
            state: values.state,
            zip: values.zip,
          },
        });
        onSubmit(values);
      } catch (error) {
        console.error('Error updating address:', error);
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
          id="street"
          name="street"
          label="Street Address"
          value={formik.values.street}
          onChange={formik.handleChange}
          error={formik.touched.street && Boolean(formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="state"
          name="state"
          label="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="zip"
          name="zip"
          label="ZIP Code"
          value={formik.values.zip}
          onChange={formik.handleChange}
          error={formik.touched.zip && Boolean(formik.errors.zip)}
          helperText={formik.touched.zip && formik.errors.zip}
        />
      </Box>
    </form>
  );
};

export default AddressForm;