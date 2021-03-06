const { Typography, LinearProgress } = require("@material-ui/core")
const { TextField, Box, Grid, Button, Card, CardHeader, Divider } = require("@material-ui/core")
import { gql, useMutation, useQuery } from '@apollo/client';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ADD_NOTE_TO_LESSON, GET_LESSON_NOTES } from 'src/graphql/lesson';
import Spinner from '../spinner/Spinner';

const Notes = (props) => {
    const [noteError, setNoteError] = useState(null);
    const { lessonId, userId } = props; 
    const { data, loading, error } = useQuery(GET_LESSON_NOTES, { variables: { lessonId }});
    const [addNote, { addNoteData, addNoteLoading, addNoteError }] = useMutation(ADD_NOTE_TO_LESSON, {
        refetchQueries: [{query: GET_LESSON_NOTES, variables: { lessonId }}],
        onError: setNoteError,
        onCompleted: () => toast("Note Added!")
    });
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    if (noteError) {
        toast(noteError.message);
        setNoteError(null);
    }

    if (loading) return <Spinner />
    if (error) return <h1>Error</h1>

    const onAdd = async () => {
        addNote({ variables: { title, description, lessonId }});
    }

    return (
        <Box p={6}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Box display="flex" flexDirection="column" m={2}>
                        <TextField label="Title" placeholder="Note title" onChange={e => setTitle(e.target.value)}/>
                        <TextField 
                            placeholder="Enter a note"
                            multiline
                            rows={6}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={onAdd}>Add Note</Button>
                        { addNoteLoading && <LinearProgress />}
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    {
                        data.getLessonNotes.map(item => {
                            return (
                                <Box m={2} key={item._id}>
                                <Card m={3}>
                                    <CardHeader style={{ textAlign: 'center' }} title={item.title}/>
                                    <Box p={2}>
                                        <Typography align="center">{item.description}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box p={1} display="flex" alignItems="center">
                                        <AccessTimeIcon color="action" />
                                        <Typography align="left" variant="body2" color="textSecondary" pl={1}>{item.user.firstname} {item.user.lastname} {moment.unix(item.createdAt / 1000).fromNow()}</Typography>
                                    </Box>
                                </Card>
                            </Box>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default Notes;