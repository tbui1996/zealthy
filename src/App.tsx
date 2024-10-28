import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Toolbar, 
  Typography,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import UserOnboarding from './pages/UserOnboarding';
import AdminSection from './pages/AdminSection';
import DataTable from './pages/DataTable';
import OnboardingBanner from './components/OnboardingBanner';
import theme from './theme';
import NavigationDrawer from './components/NavigationDrawer';
import { getProgress } from './utils/progressUtils';

const drawerWidth = 240;
const queryClient = new QueryClient();

const MainContent: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const progress = getProgress();
  const showBanner = progress?.userId && location.pathname !== '/' && !progress.completedSteps.includes(2);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close drawer when route changes on mobile
  React.useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location, isMobile]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome!
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          <NavigationDrawer onClose={handleDrawerToggle} />
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
          open
        >
          <NavigationDrawer />
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8 },
        }}
      >
        {showBanner && <OnboardingBanner />}
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<UserOnboarding />} />
            <Route path="/admin" element={<AdminSection />} />
            <Route path="/data" element={<DataTable />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <MainContent />
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;