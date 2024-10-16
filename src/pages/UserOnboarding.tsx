import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { useRecoilValue } from 'recoil';
import EmailPasswordForm from '../components/EmailPasswordForm';
import AddressForm from '../components/AddressForm';
import AboutMeForm from '../components/AboutMeForm';
import BirthdateForm from '../components/BirthdateForm';
import { pageConfigState } from '../store/atoms';

const UserOnboarding: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const pageConfig = useRecoilValue(pageConfigState);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <EmailPasswordForm onSubmit={function (values: { email: string; password: string; }): void {
            throw new Error('Function not implemented.');
        } } />;
      case 1:
      case 2:
        return (
          <>
            {pageConfig[step].includes('aboutMe') && <AboutMeForm onSubmit={function (values: { aboutMe: string; }): void {
                    throw new Error('Function not implemented.');
                } } />}
            {pageConfig[step].includes('address') && <AddressForm onSubmit={function (values: { street: string; city: string; state: string; zip: string; }): void {
                    throw new Error('Function not implemented.');
                } } />}
            {pageConfig[step].includes('birthdate') && <BirthdateForm onSubmit={function (values: { birthdate: string; }): void {
                    throw new Error('Function not implemented.');
                } } />}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User Onboarding
      </Typography>
      <Stepper activeStep={activeStep}>
        {['Email & Password', 'Page 2', 'Page 3'].map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          // Submit form data to backend
        }}
      >
        <Form>
          {renderStepContent(activeStep)}
          <div>
            {activeStep > 0 && (
              <Button onClick={handleBack}>Back</Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === 2 ? undefined : handleNext}
              type={activeStep === 2 ? 'submit' : 'button'}
            >
              {activeStep === 2 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserOnboarding;