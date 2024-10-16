import React from 'react';
import { TextField, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface AddressFormProps {
  onSubmit: (values: { street: string; city: string; state: string; zip: string }) => void;
}

const validationSchema = Yup.object({
  street: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zip: Yup.string().required('Required').matches(/^\d{5}$/, 'Invalid ZIP code'),
});

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      street: '',
      city: '',
      state: '',
      zip: '',
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