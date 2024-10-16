import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import useGetUsers from '../queries/useGetUsers';

const DataTable: React.FC = () => {
const { data: users, isLoading, error } = useGetUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

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
          {users && users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.aboutMe}</TableCell>
              <TableCell>{`${user.address?.street}, ${user.address?.city}, ${user.address?.state} ${user.address?.zip}`}</TableCell>
              <TableCell>{user.birthdate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;