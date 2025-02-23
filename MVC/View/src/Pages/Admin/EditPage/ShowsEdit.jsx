import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput,
    SelectInput,
    required,
    ImageInput,
    ImageField,
    useRecordContext,
    SelectArrayInput
} from 'react-admin';
import EpisodeList from '../ShowsPage/EpisodeList';
const roleChoices = [
    { id: 'Action', name: 'Action' },
    { id: 'Adventure', name: 'Adventure' },
    { id: 'Comedy', name: 'Comedy' },
    { id: 'Drama', name: 'Drama' },
    { id: 'Fantasy', name: 'Fantasy' },
    { id: 'Horror', name: 'Horror' },
    { id: 'Shonen', name: 'Shonen' },
    { id: 'Mystery', name: 'Mystery' },
    { id: 'Sci-Fi', name: 'Sci-Fi' },
    { id: 'Slice of Life', name: 'Slice of Life' },
    { id: 'Psychological', name: 'Psychological' },
    { id: 'Mecha', name: 'Mecha' },
    { id: 'Romance', name: 'Romance' },
    { id: 'Thriller', name: 'Thriller' },
    { id: 'Supernatural', name: 'Supernatural' },
    { id: 'Sports', name: 'Sports' },
    { id: 'Historical', name: 'Historical' },
    { id: 'Martial Arts', name: 'Martial Arts' }
];
const EpisodesSection = () => {
    const record = useRecordContext();

    if (!record) return null;

    return (
        <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
            <h3>Episodes</h3>
            {record.type === 'Movie' ? (
                <div>
                    <p style={{ color: '#666' }}>Movies can only have one episode.</p>
                    <EpisodeList maxEpisodes={1} />
                </div>
            ) : (
                <EpisodeList />
            )}
        </div>
    );
};

const ShowEdit = () => (
    <Edit>
        <SimpleForm>

            <ImageField source="image" title="name" sx={{ '& img': { maxWidth: 200 } }} />

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
            <SelectInput source="sort"
                choices={[
                    { id: 'TV Series', name: 'TV Series' },
                    { id: 'Movie', name: 'Movie' },
                    { id: 'OVA', name: 'OVA' },
                    { id: 'Special', name: 'Special' },
                    { id: 'ONA', name: 'ONA' }
                ]}
                validate={required()} />
            <TextInput source="age_rating" />
            <SelectInput source="quality"
                choices={[
                    { id: 'SD', name: 'SD' },
                    { id: 'HD', name: 'HD' }
                ]}
                validate={required()} />
            <SelectInput source="category"
                choices={[
                    { id: 'Action', name: 'Action' },
                    { id: 'Adventure', name: 'Adventure' },
                    { id: 'Comedy', name: 'Comedy' },
                    { id: 'Drama', name: 'Drama' },
                    { id: 'Fantasy', name: 'Fantasy' },
                    { id: 'Horror', name: 'Horror' },
                    { id: 'Mystery', name: 'Mystery' }
                ]}
                validate={required()} />
            <TextInput source="duration" />
            <TextInput source="staring" />
            <TextInput source="language" />
            <TextInput source="subtitles" />
            <NumberInput source="date_aired" />
            <TextInput source="director" />
            <BooleanInput source="premium" />
            <NumberInput source="rating" min={0} max={5} step={0.1} />
            <NumberInput source="views" />
            <TextInput source="country" />
            <SelectArrayInput source="genre" choices={roleChoices} />
            <SelectInput source="premiered"
                choices={[
                    { id: 'Winter', name: 'Winter' },
                    { id: 'Spring', name: 'Spring' },
                    { id: 'Summer', name: 'Summer' },
                    { id: 'Fall', name: 'Fall' },
                ]}
                validate={required()} />
            <TextInput source="image" fullWidth helperText="Enter image URL" />
            <TextInput source="trailer" fullWidth />
            <BooleanInput source="isNew" />

            <EpisodesSection />
        </SimpleForm>
    </Edit>
);

export default ShowEdit;