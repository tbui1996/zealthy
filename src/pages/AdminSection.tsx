import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { 
  FormControlLabel, 
  Checkbox, 
  Typography, 
  Button, 
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { PageConfig, pageConfigState } from '../store/atoms';
import useUpdateConfig from '../mutations/useUpdateConfig';
import useGetConfig from '../queries/useGetConfig';

const defaultConfig = {
  1: [],
  2: [],
};

const AdminSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: configResponse, isLoading: isFetching } = useGetConfig();
  const { 
    mutate: updateConfig, 
    isLoading: isSaving,
    isError,
    error,
    isSuccess
  } = useUpdateConfig();

  const [localConfig, setLocalConfig] = useState<PageConfig>(defaultConfig);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (configResponse?.data?.data) {
      setLocalConfig(configResponse.data.data);
      setHasChanges(false);
    }
  }, [configResponse]);

  const handleChange = (page: number, component: string) => {
    setLocalConfig(prevConfig => {
      const newConfig = { ...prevConfig };
      
      if (!newConfig[page]) {
        newConfig[page] = [];
      }

      if (newConfig[page].includes(component)) {
        newConfig[page] = newConfig[page].filter(item => item !== component);
      } else {
        Object.keys(newConfig).forEach(pageKey => {
          const pageNum = Number(pageKey);
          newConfig[pageNum] = newConfig[pageNum].filter(item => item !== component);
        });

        if (newConfig[page].length < 2) {
          newConfig[page] = [...newConfig[page], component];
        }
      }

      return newConfig;
    });
    setHasChanges(true);
  };

  const handleSubmit = () => {
    if (hasChanges) {
      updateConfig(localConfig);
      setHasChanges(false);
    }
  };

  const isComponentOnPage = (component: string, page: number): boolean => {
    return localConfig[page]?.includes(component) || false;
  };

  const isPageFull = (page: number): boolean => {
    return (localConfig[page]?.length || 0) >= 2;
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={isMobile ? 2 : 3}>
      <Typography variant="h5" gutterBottom>
        Admin Configuration
      </Typography>
      
      {[1, 2].map((pageIndex) => (
        <Card key={pageIndex} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {`Additional Info ${pageIndex}`}
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {['aboutMe', 'address', 'birthdate'].map((component) => {
                const isOnCurrentPage = isComponentOnPage(component, pageIndex);
                const isUsedElsewhere = Object.keys(localConfig).some(
                  page => Number(page) !== pageIndex && isComponentOnPage(component, Number(page))
                );
                const isDisabled = isSaving || 
                                 (!isOnCurrentPage && isUsedElsewhere) || 
                                 (!isOnCurrentPage && isPageFull(pageIndex));

                return (
                  <FormControlLabel
                    key={component}
                    control={
                      <Checkbox
                        checked={isOnCurrentPage}
                        onChange={() => handleChange(pageIndex, component)}
                        disabled={isDisabled}
                      />
                    }
                    label={
                      <Typography 
                        variant={isMobile ? "body2" : "body1"}
                        sx={{ 
                          color: isDisabled && !isOnCurrentPage ? 'text.disabled' : 'text.primary'
                        }}
                      >
                        {component}
                        {isUsedElsewhere && !isOnCurrentPage && 
                          ` (used on page ${Object.entries(localConfig).find(
                            ([page, components]) => Number(page) !== pageIndex && components.includes(component)
                          )?.[0]})`
                        }
                      </Typography>
                    }
                  />
                );
              })}
            </Box>
          </CardContent>
        </Card>
      ))}
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isSaving || !hasChanges}
        fullWidth={isMobile}
        sx={{ mt: 2 }}
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </Button>

      <Snackbar 
        open={isSuccess || isError} 
        autoHideDuration={6000}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isMobile ? 'center' : 'right' 
        }}
      >
        <Alert severity={isError ? 'error' : 'success'}>
          {isError 
            ? `Failed to save configuration: ${error}` 
            : 'Configuration saved successfully'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminSection;