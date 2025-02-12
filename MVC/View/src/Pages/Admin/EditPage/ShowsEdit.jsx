import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput,
    SelectInput,
    required,
    ImageInput,
    ImageField
} from 'react-admin';
import EpisodeList from '../ShowsPage/EpisodeList';

const ShowEdit = () => (
    <Edit>
        <SimpleForm>
            {/* Mevcut resmi göster */}
            <ImageField source="image" title="name" sx={{ '& img': { maxWidth: 200 } }} />
            
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
            <BooleanInput source="premium" />
            <NumberInput source="rating" min={0} max={10} step={0.1} />
            <NumberInput source="views" />
            <TextInput source="country" />
            <TextInput source="genre" />
            <TextInput source="premiered" />
            <TextInput source="image" fullWidth helperText="Enter image URL" />
            <TextInput source="trailer" fullWidth />
            <BooleanInput source="isNew" />

            {/* Episodes section */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                <h3>Episodes</h3>
                <EpisodeList />
            </div>
        </SimpleForm>
    </Edit>
);

export default ShowEdit;