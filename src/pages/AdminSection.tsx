import React from 'react';
import { useRecoilState } from 'recoil';
import { FormControlLabel, Checkbox, Typography, Button, Box } from '@mui/material';
import { PageConfig, pageConfigState } from '../store/atoms';

const AdminSection: React.FC = () => {
  const [pageConfig, setPageConfig] = useRecoilState(pageConfigState);

  const handleChange = (page: number, component: string) => {
    setPageConfig((prevConfig) => {
      const newConfig: PageConfig = { ...prevConfig };
      
      if (newConfig[page]?.includes(component)) {
        // If the component is already in the page, remove it
        newConfig[page] = newConfig[page].filter(item => item !== component);
      } else {
        // If the component is not in the page, add it only if there are fewer than 2 components
        if (newConfig[page]?.length < 2) {
          // First, remove it from any other page
          Object.keys(newConfig).forEach((key) => {
            newConfig[Number(key)] = newConfig[Number(key)].filter(item => item !== component);
          });
          // Then add it to the selected page
          newConfig[page] = [...(newConfig[page] || []), component];
        }
      }
      return newConfig;
    });
  };

  const handleSave = () => {
    // Save configuration to backend
    console.log('Saving configuration:', pageConfig);
  };

  const isComponentUsed = (component: string, currentPage: number) => {
    return Object.entries(pageConfig).some(([page, components]) => 
      Number(page) !== currentPage && components.includes(component)
    );
  };

  const isMaxComponentsReached = (page: number) => {
    return pageConfig[page]?.length >= 2;
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Configuration
      </Typography>
      {[1, 2].map((pageIndex) => (
        <Box key={pageIndex} mb={3}>
          <Typography variant="h6">{`Additional Info ${pageIndex}`}</Typography>
          {['aboutMe', 'address', 'birthdate'].map((component) => (
            <FormControlLabel
              key={component}
              control={
                <Checkbox
                  checked={pageConfig[pageIndex]?.includes(component)}
                  onChange={() => handleChange(pageIndex, component)}
                  disabled={
                    isComponentUsed(component, pageIndex) ||
                    (isMaxComponentsReached(pageIndex) && !pageConfig[pageIndex]?.includes(component))
                  }
                />
              }
              label={component}
            />
          ))}
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Configuration
      </Button>
    </Box>
  );
};

export default AdminSection;