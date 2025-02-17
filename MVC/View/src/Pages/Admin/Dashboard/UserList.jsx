import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const UserList = ({ users }) => {
  return (
    <List>
      {users && users.map(user => (
        <ListItem key={user.id}>
          <ListItemText primary={user.username} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList; 