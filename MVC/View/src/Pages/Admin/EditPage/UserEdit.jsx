// Pages/Admin/Dashboard/UserEdit.jsx
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    required,
    email,
    PasswordInput
} from 'react-admin';
import { Card, CardContent } from '@mui/material';

const UserEdit = () => (
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
                    <PasswordInput 
                        source="password"
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
                </SimpleForm>
            </CardContent>
        </Card>
    </Edit>
);

export default UserEdit;