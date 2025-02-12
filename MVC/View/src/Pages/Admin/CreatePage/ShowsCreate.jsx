import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput,
    SelectInput,
    required,
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
                        { id: 'movie', name: 'Movie' },
                        { id: 'series', name: 'Series' }
                    ]}
                    validate={required()}
                />
                <TextInput source="sort" />
                <TextInput source="age_rating" />
                <TextInput source="quality" />
                <TextInput source="category" />
                <TextInput source="duration" />
                <TextInput source="staring" />
                <TextInput source="language" />
                <TextInput source="subtitles" />
                <NumberInput source="date_aired" />
                <TextInput source="director" />
                <BooleanInput source="premium" defaultValue={false} />
                <NumberInput source="rating" min={0} max={10} step={0.1} defaultValue={0} />
                <NumberInput source="views" defaultValue={0} />
                <TextInput source="country" />
                <TextInput source="genre" />
                <TextInput source="premiered" />
                
                <Box mt={2} mb={2}>
                    <Typography variant="subtitle1">Image Preview:</Typography>
                    <ImagePreview record={record} />
                </Box>
                
                <TextInput 
                    source="image" 
                    fullWidth 
                    helperText="Enter image URL"
                />
                <TextInput source="trailer" fullWidth />
                <BooleanInput source="isNew" defaultValue={true} />
            </SimpleForm>
        </Create>
    );
};

export default ShowCreate;