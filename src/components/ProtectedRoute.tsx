import React from 'react';
import { Box } from '@mui/material';
import OnboardingBanner from './OnboardingBanner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <Box>
      <OnboardingBanner />
      {children}
    </Box>
  );
};

export default ProtectedRoute;