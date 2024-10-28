import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Typography, 
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import useGetAllUsers from '../queries/useGetAllUsers';

const DataTable: React.FC = () => {
  const { data: users, isLoading, error } = useGetAllUsers();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Box p={2}>
      <Typography color="error">An error occurred: {error.message}</Typography>
    </Box>
  );
  
  if (!users || users.length === 0) return (
    <Box p={2}>
      <Typography>No user data found</Typography>
    </Box>
  );

  const safeValue = (value: any): string => 
    value === null || value === undefined ? '' : String(value);

  const formatAddress = (address: any): string => {
    if (!address) return '';
    const { street, city, state, zip } = address;
    return [street, city, state, zip].filter(Boolean).join(', ');
  };

  if (isMobile) {
    return (
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          User Data
        </Typography>
        {users.map((user) => (
          <Card key={user.email} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" color="primary">
                {safeValue(user.email)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>About:</strong> {safeValue(user.aboutMe)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Address:</strong> {formatAddress(user.address)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Birthdate:</strong> {safeValue(user.birthdate)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        User Data
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>About Me</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Birthdate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{safeValue(user.email)}</TableCell>
                  <TableCell>{safeValue(user.aboutMe)}</TableCell>
                  <TableCell>{formatAddress(user.address)}</TableCell>
                  <TableCell>{safeValue(user.birthdate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

export default DataTable;