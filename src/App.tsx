import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import UserOnboarding from './pages/UserOnboarding';
import AdminSection from './pages/AdminSection';
import DataTable from './pages/DataTable';
import theme from './theme';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" Component={UserOnboarding} />
                <Route path="/admin" Component={AdminSection} />
                <Route path="/data" Component={DataTable} />
              </Routes>
            </Router>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
      </RecoilRoot>
  );
};

export default App;