// Pages/Admin/Dashboard/UserEdit.jsx
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    required,
    email,
    Notification,
    PasswordInput
} from 'react-admin';
import { Card, CardContent, Button } from '@mui/material';
import { useNotify } from 'react-admin';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const UserEdit = () => {
    const notify = useNotify();
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setNewPassword('');
        setOpen(false);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!newPassword) {
            notify("Please enter new password.", { type: 'warning' });
            return;
        }

        const response = await fetch(`http://localhost:3000/users/${id}/reset-password`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPassword })
        });

        if (response.ok) {
            notify("Password successfully changed.", { type: 'info' });
        } else {
            const errorMessage = response.status === 400 
                ? "Try another password." 
                : "Password reset failed.";
            notify(errorMessage, { type: 'warning' });
        }
        handleClose();
    };

    return (
        <Edit>
            <Card>
                <CardContent>
                    <SimpleForm>
                        <TextInput disabled source="id" />
                        <TextInput 
                            source="username" 
                            validate={required()} 
                            fullWidth
                        />
                        <TextInput 
                            source="email" 
                            validate={[required(), email()]} 
                            fullWidth
                        />
                        <SelectInput 
                            source="role" 
                            choices={[
                                { id: 'admin', name: 'Admin' },
                                { id: 'user', name: 'User' },
                                { id: 'editor', name: 'Editor' }
                            ]}
                            validate={required()}
                            fullWidth
                        />
                        <Button onClick={handleResetPassword} variant="contained" color="secondary">
                            Reset Password
                        </Button>
                    </SimpleForm>
                </CardContent>
            </Card>
            <Notification />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <SimpleForm toolbar={false}>
                        <PasswordInput
                            autoFocus
                            source='NewPassword'
                            margin="dense"
                            label="New Password"
                            fullWidth
                            value={newPassword || ''}
                            onChange={(e) => setNewPassword(e.target.value || '')}
                        />
                    </SimpleForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        ACCEPT
                    </Button>
                </DialogActions>
            </Dialog>
        </Edit>
    );
};

export default UserEdit;