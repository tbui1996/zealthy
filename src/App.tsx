import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import UserOnboarding from './pages/UserOnboarding';
import AdminSection from './pages/AdminSection';
import DataTable from './pages/DataTable';
import theme from './theme';
import NavigationDrawer from './components/NavigationDrawer';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Box sx={{ display: 'flex' }}>
              <AppBar position="fixed">
                <Toolbar>
                  <NavigationDrawer />
                  <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, ml: 2 }}>
                    Welcome!
                  </Typography>
                </Toolbar>
              </AppBar>
              <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Routes>
                  <Route path="/" element={<UserOnboarding />} />
                  <Route path="/admin" element={<AdminSection />} />
                  <Route path="/data" element={<DataTable />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;