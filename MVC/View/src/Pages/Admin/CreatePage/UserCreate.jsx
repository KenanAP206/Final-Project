// Pages/Admin/Dashboard/UserCreate.jsx
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    PasswordInput,
    required,
    email
} from 'react-admin';
import { Card, CardContent } from '@mui/material';

const UserCreate = () => (
    <Create>
        <Card>
            <CardContent>
                <SimpleForm>
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
                        validate={required()} 
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
    </Create>
);

export default UserCreate;