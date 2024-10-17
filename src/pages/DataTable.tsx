import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import useGetAllUsers from '../queries/useGetAllUsers';

const DataTable: React.FC = () => {
  const { data: users, isLoading, error } = useGetAllUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!users || users.length === 0) return <div>No user data found</div>;

  // Helper function to safely get a value or return an empty string
  const safeValue = (value: any): string => 
    value === null || value === undefined ? '' : String(value);

  // Helper function to safely format address
  const formatAddress = (address: any): string => {
    if (!address) return '';
    const { street, city, state, zip } = address;
    return [street, city, state, zip].filter(Boolean).join(', ');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User Data
      </Typography>
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
    </div>
  );
};

export default DataTable;