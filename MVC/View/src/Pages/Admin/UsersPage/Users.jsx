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
    DeleteButton,
    Pagination,
    BulkDeleteButton
} from 'react-admin';

const PostPagination = props => (
    <Pagination rowsPerPageOptions={[10, 25, 50]} {...props} />
);

// Özel toplu silme butonu bileşeni (isteğe bağlı)
const PostBulkActionButtons = () => (
    <>
        <BulkDeleteButton />
    </>
);

// Kullanıcı listesi görünümü
export const UserList = () => (
    <List 
        pagination={<PostPagination />}
        perPage={10}
        sort={{ field: 'username', order: 'ASC' }}
    >
        <Datagrid bulkActionButtons={<PostBulkActionButtons />}>
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="role" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// Kullanıcı düzenleme formu
export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="role" />
        </SimpleForm>
    </Edit>
);

// Yeni kullanıcı oluşturma formu
export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="password" />
            <TextInput source="role" />
        </SimpleForm>
    </Create>
);

export default {UserList, UserCreate, UserEdit}