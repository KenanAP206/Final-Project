// Pages/Admin/UsersPage/Users.jsx
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
  } from 'react-admin';
  
  // Kullanıcı listesi görünümü
  export const UserList = () => (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="role" />
        <EditButton />
      </Datagrid>
    </List>
  );
  
  // Kullanıcı düzenleme formu
  export const UserEdit = () => (
    <Edit>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="role" />
      </SimpleForm>
    </Edit>
  );
  
  // Yeni kullanıcı oluşturma formu
  export const UserCreate = () => (
    <Create>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="password" />
        <TextInput source="role" />
      </SimpleForm>
    </Create>
  );

  export default {UserList,UserCreate,UserEdit}