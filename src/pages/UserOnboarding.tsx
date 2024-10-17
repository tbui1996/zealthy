import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Typography, Box, Button } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import EmailPasswordForm from '../components/EmailPasswordForm';
import AddressForm from '../components/AddressForm';
import AboutMeForm from '../components/AboutMeForm';
import BirthdateForm from '../components/BirthdateForm';
import { pageConfigState } from '../store/atoms';

const UserOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [stepData, setStepData] = useState<{[key: string]: any}>({});
  const pageConfig = useRecoilValue(pageConfigState);
  const steps = ['Account Creation', ...Object.keys(pageConfig).map((_, index) => `Additional Info ${index + 1}`)];

  const handleCreateUserSuccess = (newUserId: string) => {
    setUserId(newUserId);
    setActiveStep(1);
  };

  const handleStepCompletion = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Redirect to data page on completion
      navigate(`/data`);
    }
  };

  const handleFormSubmit = (formName: string, data: any) => {
    setStepData(prevData => ({
      ...prevData,
      [formName]: data
    }));
  };

  const isStepComplete = () => {
    const currentForms = pageConfig[activeStep] || [];
    return currentForms.every((form) => {
      const formData = stepData[form];
      if (!formData) return false;
      
      switch (form) {
        case 'aboutMe':
          return formData.aboutMe && formData.aboutMe.trim() !== '';
        case 'address':
          return formData.street && formData.city && formData.state && formData.zip;
        case 'birthdate':
          return formData.birthdate && formData.birthdate.trim() !== '';
        default:
          return false;
      }
    });
  };

  useEffect(() => {
    console.log('Step Data:', stepData);
    console.log('Is Step Complete:', isStepComplete());
  }, [stepData]);

  const renderStepContent = (step: number) => {
    if (step === 0) {
      return <EmailPasswordForm onSuccess={handleCreateUserSuccess} />;
    } else if (userId) {
      const pageIndex = step;
      const components = [];
  
      if (pageConfig[pageIndex]?.includes('aboutMe')) {
        components.push(
          <AboutMeForm 
            key="aboutMe" 
            userId={userId} 
            onSubmit={(data) => handleFormSubmit('aboutMe', data)} 
          />
        );
      }
      if (pageConfig[pageIndex]?.includes('address')) {
        components.push(
          <AddressForm 
            key="address" 
            userId={userId} 
            onSubmit={(data) => handleFormSubmit('address', data)} 
          />
        );
      }
      if (pageConfig[pageIndex]?.includes('birthdate')) {
        components.push(
          <BirthdateForm 
            key="birthdate" 
            userId={userId} 
            onSubmit={(data) => handleFormSubmit('birthdate', data)} 
          />
        );
    }

      return components.length > 0 ? (
        <Box>
          {components.map((component, index) => (
            <Box key={index} mb={index < components.length - 1 ? 4 : 0}>
              {component}
            </Box>
          ))}
          <Button 
            color="primary" 
            variant="contained" 
            fullWidth 
            onClick={handleStepCompletion}
            disabled={!isStepComplete()}
          >
            {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </Box>
      ) : null;
    } else {
      return <Typography>Error: User ID not found. Please start over.</Typography>;
    }
  };

  return (
    <Box maxWidth="md" margin="auto" padding={4}>
      <Typography variant="h4" align="center" gutterBottom>
        User Onboarding
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={4}>
        {renderStepContent(activeStep)}
      </Box>
    </Box>
  );
};

export default UserOnboarding;