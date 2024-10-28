import React, { useState, useEffect } from 'react';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  Box, 
  Button, 
  CircularProgress,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailPasswordForm from '../components/EmailPasswordForm';
import AddressForm from '../components/AddressForm';
import AboutMeForm from '../components/AboutMeForm';
import BirthdateForm from '../components/BirthdateForm';
import useGetConfig from '../queries/useGetConfig';
import { saveProgress, getProgress, clearProgress, UserProgress } from '../utils/progressUtils';

const UserOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [stepData, setStepData] = useState<{[key: string]: any}>({});
  
  const { data: configResponse, isLoading, isError } = useGetConfig();
  const pageConfig = configResponse?.data?.data || { 1: [], 2: [] };

  const steps = ['Account Creation', ...Object.keys(pageConfig)
    .sort((a, b) => Number(a) - Number(b))
    .map(pageNum => `Additional Info ${pageNum}`)
  ];

  // Load saved progress on initial mount
  useEffect(() => {
    const savedProgress = getProgress();
    if (savedProgress) {
      setUserId(savedProgress.userId);
      setActiveStep(savedProgress.currentStep);
      setCompletedSteps(savedProgress.completedSteps);
      
      // If they've already created an account but haven't completed onboarding,
      // ensure step 0 (account creation) is marked as completed
      if (savedProgress.userId && !savedProgress.completedSteps.includes(0)) {
        setCompletedSteps(prev => [...prev, 0]);
      }
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (userId) {
      const progress: UserProgress = {
        userId,
        currentStep: activeStep,
        completedSteps
      };
      saveProgress(progress);
    }
  }, [userId, activeStep, completedSteps]);

  const handleCreateUserSuccess = (newUserId: string) => {
    setUserId(newUserId);
    setActiveStep(1);
    setCompletedSteps(prev => [...prev, 0]); // Mark account creation as complete
  };

  const handleStepCompletion = () => {
    setCompletedSteps(prev => [...prev, activeStep]);
    
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      clearProgress(); // Clear progress when flow is complete
      navigate('/data');
    }
  };

  const handleFormSubmit = (formName: string, data: any) => {
    setStepData(prevData => ({
      ...prevData,
      [formName]: data
    }));
  };

  const isStepComplete = (step: number): boolean => {
    if (step === 0) {
      return Boolean(userId) || completedSteps.includes(0);
    }

    const currentForms = pageConfig[step] || [];
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

  const renderStepContent = (step: number) => {
    if (step === 0) {
      return <EmailPasswordForm onSuccess={handleCreateUserSuccess} />;
    }

    if (!userId) {
      return (
        <Box p={2}>
          <Typography color="error">
            Error: User ID not found. Please start over.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              clearProgress();
              setActiveStep(0);
              setCompletedSteps([]);
            }}
            sx={{ mt: 2 }}
          >
            Start Over
          </Button>
        </Box>
      );
    }

    const currentPageComponents = pageConfig[step] || [];

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
      <Box p={isMobile ? 2 : 3}>
        {components}
        <Button 
          color="primary" 
          variant="contained" 
          fullWidth={isMobile}
          onClick={handleStepCompletion}
          disabled={!isStepComplete(step)}
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
      <Box p={2}>
        <Typography color="error">
          Error loading configuration. Please refresh the page.
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="md" margin="auto" padding={isMobile ? 2 : 4}>
      <Typography variant="h4" align="center" gutterBottom>
        User Onboarding
      </Typography>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel={!isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completedSteps.includes(index)}>
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