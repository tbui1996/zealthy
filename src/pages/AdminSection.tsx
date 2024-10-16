import React from 'react';
import { useRecoilState } from 'recoil';
import { FormControlLabel, Checkbox, Typography, Button } from '@mui/material';
import { pageConfigState } from '../store/atoms';

const AdminSection: React.FC = () => {
  const [pageConfig, setPageConfig] = useRecoilState(pageConfigState);

  const handleChange = (page: number, component: string) => {
    setPageConfig((prevConfig) => {
      const newConfig = { ...prevConfig };
      const pageIndex = newConfig[page].indexOf(component);
      if (pageIndex === -1) {
        newConfig[page].push(component);
      } else {
        newConfig[page].splice(pageIndex, 1);
      }
      return newConfig;
    });
  };

  const handleSave = () => {
    // Save configuration to backend
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Configuration
      </Typography>
      {['Page 2', 'Page 3'].map((page, index) => (
        <div key={page}>
          <Typography variant="h6">{page}</Typography>
          {['aboutMe', 'address', 'birthdate'].map((component) => (
            <FormControlLabel
              key={component}
              control={
                <Checkbox
                  checked={pageConfig[index + 1].includes(component)}
                  onChange={() => handleChange(index + 1, component)}
                />
              }
              label={component}
            />
          ))}
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Configuration
      </Button>
    </div>
  );
};

export default AdminSection;