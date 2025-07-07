'use client';

import { useState } from 'react';
import ComplaintForm from './components/ComplaintForm';
import AdminDashboard from './components/AdminDashboard';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Tabs, 
  Tab, 
  Box, 
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fade,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  SupportAgent,
  Dashboard,
  ReportProblem,
  Brightness4,
  Brightness7
} from '@mui/icons-material';

// Create custom theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed',
      light: '#8b5cf6',
      dark: '#6d28d9',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          minHeight: 48,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          minHeight: 48,
        },
      },
    },
  },
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in={true} timeout={300}>
          <Box sx={{ py: 4 }}>{children}</Box>
        </Fade>
      )}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ py: 1 }}>
            <ReportProblem sx={{ mr: 2, fontSize: 28 }} />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              ComplaintFlow Pro
            </Typography>
            <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

       
        <Box
          sx={{
            background: darkMode 
              ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            py: 6,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Box textAlign="center">
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx={{ 
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                Professional Complaint Management
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Streamline your customer feedback process with our comprehensive 
                complaint tracking and resolution system
              </Typography>
            </Box>
          </Container>
        </Box>

        
        <Container maxWidth="lg">
          <Paper 
            elevation={0}
            sx={{ 
              mt: -3,
              mb: 4,
              position: 'relative',
              zIndex: 1,
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                },
              }}
            >
              <Tab 
                icon={<SupportAgent />}
                iconPosition="start"
                label="Submit Complaint" 
                sx={{ py: 3 }}
              />
              <Tab 
                icon={<Dashboard />}
                iconPosition="start"
                label="Admin Dashboard" 
                sx={{ py: 3 }}
              />
            </Tabs>
          </Paper>

          
          <TabPanel value={activeTab} index={0}>
            <ComplaintForm />
          </TabPanel>
          
          <TabPanel value={activeTab} index={1}>
            <AdminDashboard />
          </TabPanel>
        </Container>

      
        <Box
          component="footer"
          sx={{
            py: 4,
            mt: 8,
            borderTop: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          {/* <Container maxWidth="lg">
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
            >
              © 2025 ComplaintFlow Pro. Built with Next.js & Material-UI
            </Typography>
          </Container> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
