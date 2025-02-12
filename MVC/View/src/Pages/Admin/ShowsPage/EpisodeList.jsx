import { useState, useEffect } from 'react';
import { Button, useNotify, useRecordContext } from 'react-admin';
import { Box, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, DragIndicator } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EpisodeList = ({ maxEpisodes }) => {
    const [episodes, setEpisodes] = useState([]);
    const [newEpisode, setNewEpisode] = useState({ link: '', isNew: false });
    const notify = useNotify();
    const record = useRecordContext(); // This gets the current show being edited
    const [orderedEpisodes, setOrderedEpisodes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingEpisode, setEditingEpisode] = useState({ link: '', isNew: false });

    const loadEpisodes = async () => {
        if (!record?.id) return;
        try {
            const response = await fetch(`http://localhost:3000/episodes/shows/${record.id}`);
            const data = await response.json();
            setEpisodes(data.map(episode => ({
                ...episode,
                id: episode._id
            })));
        } catch (error) {
            notify('Error loading episodes', { type: 'error' });
        }
    };

    useEffect(() => {
        loadEpisodes();
    }, [record?.id]);

    useEffect(() => {
        // When episodes load, add order property if not exists
        setOrderedEpisodes(episodes.map((episode, index) => ({
            ...episode,
            order: episode.order ?? index + 1
        })));
    }, [episodes]);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/episodes/${id}`, {
                method: 'DELETE',
            });
            notify('Episode deleted successfully');
            loadEpisodes();
        } catch (error) {
            notify('Error deleting episode', { type: 'error' });
        }
    };

    const handleAddEpisode = async (e) => {
        e.preventDefault();
        if (!record?.id) {
            notify('Show ID is missing', { type: 'error' });
            return;
        }

        if (!newEpisode.link.trim()) {
            notify('Episode link cannot be empty', { type: 'error' });
            return;
        }

        // Check if the show type is 'movie' and if an episode already exists
        if (record.type === 'movie' && episodes.length > 0) {
            notify('Movies can only have one episode.', { type: 'warning' });
            return;
        }

        // Check if we've reached the episode limit for series
        if (maxEpisodes && episodes.length >= maxEpisodes) {
            notify('Cannot add more episodes. Maximum limit reached.', { type: 'warning' });
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/episodes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newEpisode,
                    showId: record.id,
                    order: orderedEpisodes.length + 1
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add episode');
            }

            notify('Episode added successfully', { type: 'success' });
            setNewEpisode({ link: '', isNew: false });
            await loadEpisodes();
        } catch (error) {
            notify(error.message || 'Error adding episode', { type: 'error' });
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(orderedEpisodes);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update order numbers
        const updatedItems = items.map((item, index) => ({
            ...item,
            order: index + 1
        }));

        setOrderedEpisodes(updatedItems);

        // Update order in backend
        try {
            await Promise.all(updatedItems.map(episode => 
                fetch(`http://localhost:3000/episodes/${episode.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...episode,
                        showId: record.id
                    })
                })
            ));
            notify('Episode order updated successfully', { type: 'success' });
        } catch (error) {
            notify('Error updating episode order', { type: 'error' });
        }
    };

    return (
        <Box mt={2}>
            {(!maxEpisodes || episodes.length < maxEpisodes) && (
                <Box sx={{ marginBottom: '1rem' }}>
                    <TextField
                        label="Episode Link"
                        value={newEpisode.link}
                        onChange={(e) => setNewEpisode(prev => ({ ...prev, link: e.target.value }))}
                        fullWidth
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={newEpisode.isNew}
                                onChange={(e) => setNewEpisode(prev => ({ ...prev, isNew: e.target.checked }))}
                            />
                        }
                        label="Is New Episode"
                    />
                    <Button
                        onClick={handleAddEpisode}
                        label="Add Episode"
                        variant="contained"
                        color="primary"
                    />
                </Box>
            )}

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="episodes">
                    {(provided) => (
                        <table 
                            style={{ width: '100%', borderCollapse: 'collapse' }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <thead>
                                <tr>
                                    <th style={{ width: '50px', textAlign: 'center' }}>#</th>
                                    <th style={{ width: '50px' }}></th>
                                    <th style={{ textAlign: 'left', padding: '8px' }}>Link</th>
                                    <th style={{ textAlign: 'left', padding: '8px' }}>Is New</th>
                                    <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderedEpisodes.map((episode, index) => (
                                    <Draggable 
                                        key={episode.id} 
                                        draggableId={episode.id.toString()} 
                                        index={index}
                                    >
                                        {(provided) => (
                                            <tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <td style={{ textAlign: 'center' }}>
                                                    {episode.order}
                                                </td>
                                                <td {...provided.dragHandleProps}>
                                                    <DragIndicator />
                                                </td>
                                                <td style={{ padding: '8px' }}>
                                                    {editingId === episode.id ? (
                                                        <TextField
                                                            value={editingEpisode.link}
                                                            onChange={(e) => setEditingEpisode(prev => ({
                                                                ...prev,
                                                                link: e.target.value
                                                            }))}
                                                            size="small"
                                                            fullWidth
                                                        />
                                                    ) : (
                                                        episode.link
                                                    )}
                                                </td>
                                                <td style={{ padding: '8px' }}>
                                                    {editingId === episode.id ? (
                                                        <Checkbox
                                                            checked={editingEpisode.isNew}
                                                            onChange={(e) => setEditingEpisode(prev => ({
                                                                ...prev,
                                                                isNew: e.target.checked
                                                            }))}
                                                        />
                                                    ) : (
                                                        episode.isNew ? 'Yes' : 'No'
                                                    )}
                                                </td>
                                                <td style={{ padding: '8px' }}>
                                                    <IconButton
                                                        onClick={() => {
                                                            setEditingId(episode.id);
                                                            setEditingEpisode({
                                                                link: episode.link,
                                                                isNew: episode.isNew
                                                            });
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDelete(episode.id)}
                                                        color="error"
                                                    >
                                                        <CancelIcon />
                                                    </IconButton>
                                                </td>
                                            </tr>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </tbody>
                        </table>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};

export default EpisodeList;