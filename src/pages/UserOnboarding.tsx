import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailPasswordForm from '../components/EmailPasswordForm';
import AddressForm from '../components/AddressForm';
import AboutMeForm from '../components/AboutMeForm';
import BirthdateForm from '../components/BirthdateForm';
import useGetConfig from '../queries/useGetConfig';

const UserOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [stepData, setStepData] = useState<{[key: string]: any}>({});
  
  const { data: configResponse, isLoading, isError } = useGetConfig();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageConfig = configResponse?.data?.data || { 1: [], 2: [] };

  // Create steps array including Account Creation and additional info pages
  const steps = ['Account Creation', ...Object.keys(pageConfig)
    .sort((a, b) => Number(a) - Number(b))
    .map(pageNum => `Additional Info ${pageNum}`)
  ];

  useEffect(() => {
    console.log('Current pageConfig:', pageConfig);
    console.log('Current activeStep:', activeStep);
    console.log('Current stepData:', stepData);
  }, [pageConfig, activeStep, stepData]);

  const handleCreateUserSuccess = (newUserId: string) => {
    setUserId(newUserId);
    setActiveStep(1);
  };

  const handleStepCompletion = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
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
    if (activeStep === 0) return true;

    const currentForms = pageConfig[activeStep] || [];
    console.log('Checking completion for forms:', currentForms);
    
    return currentForms.every((form) => {
      const formData = stepData[form];
      console.log(`Checking ${form} completion:`, formData);
      
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

  const renderStepContent = (step: number) => {
    if (step === 0) {
      return <EmailPasswordForm onSuccess={handleCreateUserSuccess} />;
    }

    if (!userId) {
      return <Typography>Error: User ID not found. Please start over.</Typography>;
    }

    const currentPageComponents = pageConfig[step] || [];
    console.log(`Rendering page ${step} components:`, currentPageComponents);

    const components = currentPageComponents.map(componentName => {
      switch (componentName) {
        case 'aboutMe':
          return (
            <Box key="aboutMe" mb={2}>
              <AboutMeForm 
                userId={userId} 
                onSubmit={(data) => handleFormSubmit('aboutMe', data)} 
              />
            </Box>
          );
        case 'address':
          return (
            <Box key="address" mb={2}>
              <AddressForm 
                userId={userId} 
                onSubmit={(data) => handleFormSubmit('address', data)} 
              />
            </Box>
          );
        case 'birthdate':
          return (
            <Box key="birthdate" mb={2}>
              <BirthdateForm 
                userId={userId} 
                onSubmit={(data) => handleFormSubmit('birthdate', data)} 
              />
            </Box>
          );
        default:
          return null;
      }
    }).filter(Boolean);

    return components.length > 0 ? (
      <Box>
        {components}
        <Button 
          color="primary" 
          variant="contained" 
          fullWidth 
          onClick={handleStepCompletion}
          disabled={!isStepComplete()}
          sx={{ mt: 2 }}
        >
          {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </Box>
    ) : null;
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Typography color="error">
          Error loading configuration. Please refresh the page.
        </Typography>
      </Box>
    );
  }

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