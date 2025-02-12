import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    NumberField,
    EditButton,
    DeleteButton,
    Pagination,
    BulkDeleteButton,
    ImageField
} from 'react-admin';

const PostPagination = props => (
    <Pagination rowsPerPageOptions={[10, 25, 50]} {...props} />
);

const PostBulkActionButtons = () => (
    <>
        <BulkDeleteButton />
    </>
);

export const ShowList = () => (
    <List 
        pagination={<PostPagination />}
        perPage={10}
        sort={{ field: 'name', order: 'ASC' }}
    >
        <Datagrid bulkActionButtons={<PostBulkActionButtons />}>
            <ImageField source="image" title="name" />
            <TextField source="name" />
            <TextField source="type" />
            <TextField source="category" />
            <NumberField source="year" />
            <TextField source="quality" />
            <BooleanField source="premium" />
            <NumberField source="rating" />
            <NumberField source="views" />
            <BooleanField source="isNew" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default ShowList;