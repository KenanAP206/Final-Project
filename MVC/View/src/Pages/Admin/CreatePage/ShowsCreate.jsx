import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput,
    SelectInput,
    required,
    ImageField,
    useRecordContext
} from 'react-admin';
import { Box, Typography } from '@mui/material';

const ImagePreview = ({ record }) => {
    if (!record || !record.image) return null;

    return (
        <Box mt={2} mb={2}>
            <img
                src={record.image}
                alt="Preview"
                style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            />
        </Box>
    );
};

const ShowCreate = () => {
    const record = useRecordContext();

    return (
        <Create>
            <SimpleForm>
       
                <TextInput source="name" validate={required()} fullWidth />
                <TextInput source="desc" multiline rows={4} fullWidth />
                <NumberInput source="year" validate={required()} />
                <SelectInput
                    source="type"
                    choices={[
                        { id: 'Movie', name: 'Movie' },
                        { id: 'Series', name: 'Series' }
                    ]}
                    validate={required()}
                />
                <SelectInput
                    source="sort"
                    choices={[
                        { id: 'Tv series', name: 'TV Series' },
                        { id: 'Movie', name: 'Movie' },
                        { id: 'OVA', name: 'OVA' },
                        { id: 'Special', name: 'Special' },
                        { id: 'ONA', name: 'ONA' }
                    ]}
                    validate={required()}
                />
                <TextInput source="age_rating" />
                <TextInput source="quality" />
                <SelectInput
                    source="category"
                    choices={[
                        { id: 'Action', name: 'Action' },
                        { id: 'Adventure', name: 'Adventure' },
                        { id: 'Comedy', name: 'Comedy' },
                        { id: 'Drama', name: 'Drama' },
                        { id: 'Fantasy', name: 'Fantasy' },
                        { id: 'Horror', name: 'Horror' },
                        { id: 'Mystery', name: 'Mystery' }
                    ]}
                    validate={required()}
                />
                <TextInput source="duration" />
                <TextInput source="staring" />
                <TextInput source="language" />
                <TextInput source="subtitles" />
                <NumberInput source="date_aired" />
                <TextInput source="director" />
                <BooleanInput source="premium" />
                <NumberInput source="rating" min={0} max={10} step={0.1} />
                <NumberInput source="views" />
                <TextInput source="country" />
                <TextInput source="genre" />
                <SelectInput
                    source="premiered"
                    choices={[
                        { id: 'Winter', name: 'Winter' },
                        { id: 'Spring', name: 'Spring' },
                        { id: 'Summer', name: 'Summer' },
                        { id: 'Fall', name: 'Fall' }
                    ]}
                    validate={required()}/>
           
            

         
            <TextInput
                source="image"
                fullWidth
                helperText="Enter image URL"
            />
            <TextInput source="trailer" fullWidth />
            <BooleanInput source="isNew" defaultValue={true} />
        </SimpleForm>
        </Create >
    );
};

export default ShowCreate;