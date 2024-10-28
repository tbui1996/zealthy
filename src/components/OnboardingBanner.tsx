import React from 'react';
import { 
  Paper, 
  Button, 
  Typography, 
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProgress } from '../utils/progressUtils';

const OnboardingBanner: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const progress = getProgress();

  if (!progress || progress.completedSteps.includes(2)) {
    return null;
  }

  return (
    <Paper 
      elevation={0}
      sx={{
        position: 'sticky',
        top: isMobile ? 56 : 64, // Adjust based on your AppBar height
        zIndex: 1100,
        backgroundColor: 'primary.light',
        color: 'primary.contrastText',
        p: 2,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2
      }}
    >
      <Typography variant={isMobile ? "body2" : "body1"}>
        Your onboarding is incomplete.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        size={isMobile ? "small" : "medium"}
        sx={{ 
          whiteSpace: 'nowrap',
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          }
        }}
      >
        Continue Setup
      </Button>
    </Paper>
  );
};

export default OnboardingBanner;