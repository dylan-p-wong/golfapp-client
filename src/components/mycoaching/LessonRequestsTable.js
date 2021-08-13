import { useMutation, useQuery } from '@apollo/client';
import { Autocomplete, TextField, Dialog, DialogContent, DialogTitle, DialogActions, Box, Button, Card, CardContent, TablePagination, CardHeader, Chip, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import moment from 'moment';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GET_USERS } from 'src/graphql/auth';
import { ADD_LESSON_TO_LESSON_REQUEST, CREATE_LESSON, CREATE_LESSON_REQUEST, GET_USER_LESSONS_COACH, GET_USER_LESSON_REQUESTS_COACH } from 'src/graphql/lesson';
import { USER_TIER_INFO } from 'src/graphql/user';

const LessonRequestsTable = (props) => {
    const { lessonRequests, players } = props;
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [createLesson, { loading : lessonLoading, error : lessonError, data : lessonData }] = useMutation(CREATE_LESSON, {
        onError: setError,
        refetchQueries: [{ query: GET_USER_LESSONS_COACH }, { query: USER_TIER_INFO }],
    });
    const [addLessonToLessonRequest, { loading: addLessonToLessonRequestLoading, error: addLessonToLessonRequestError, data: addLessonToLessonRequestData }] = useMutation(ADD_LESSON_TO_LESSON_REQUEST, {
        refetchQueries: [
            { query: GET_USER_LESSON_REQUESTS_COACH }
        ],
        onError: setError,
        onCompleted: (data) => console.log(data)
    });
    
    const [title, setTitle] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    if (error) {
        toast(error.message);
        setError(null);
    }

    if (lessonData) {
        return <Navigate to={`/app/lesson/edit/${lessonData.createLesson._id}`} />
    }

    const addLessonHandle = async () => {
        await createLesson({ variables: { playerId: selectedUser._id, title }});
    }

    const addLessonToLessonRequestHandle = async (item) => {
        const { data } = await createLesson({ variables: { playerId: item.player._id, title: item.note }});
        addLessonToLessonRequest({ variables: { lessonId: data.createLesson._id, lessonRequestId: item._id }});
    }

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>{"Select Student"}</DialogTitle>
          <DialogContent>
            {/* <TextField fullWidth label="Title" placeholder="Note title" onChange={e => setTitle(e.target.value)}/> */}
            <Autocomplete
              onChange={(event, newValue) => { setSelectedUser(newValue) }}
              style={{ width: 300 }} 
              options={players}
              getOptionLabel={(option) => option.email}
              renderInput={(params) => <TextField {...params} label="Student" variant="outlined"/>}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" size="small" onClick={addLessonHandle}>Create Lesson</Button>
          </DialogActions>
        </Dialog>
        <Card>
            <CardHeader title="Lesson Requests" action={<Button color="primary" variant="contained" size="small" onClick={() => setOpen(true)}>Create Lesson</Button>}/>
            <CardContent>
            <PerfectScrollbar>
                <Box>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>
                            Player
                        </TableCell>
                        <TableCell sortDirection="desc">
                            <Tooltip
                              enterDelay={300}
                              title="Sort"
                            >
                        <TableSortLabel
                        active
                        direction="desc"
                        >
                            Date
                        </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            Status
                        </TableCell>
                        <TableCell>
                            Actions
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {lessonRequests.slice(page * limit, page * limit + limit).map(item => (
                        <TableRow
                        hover
                        key={item._id}
                        >
                        <TableCell>
                            {item.player.firstname + " " + item.player.lastname}
                        </TableCell>
                        <TableCell>
                            {moment.unix(item.createdAt / 1000).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>
                            <Chip
                            color="primary"
                            label={item.lesson && item.lesson.isCompleted ? 'completed' : item.isCancelled ? 'cancelled' : 'pending'}
                            size="small"
                            />
                        </TableCell>
                        <TableCell>
                            {item.lesson ? <Button onClick={() => navigate(`/app/lesson/${item.lesson._id}`, { replace: true })} variant="contained" size="small">View</Button> : !item.isCancelled ? <Button variant="contained" size="small" onClick={() => addLessonToLessonRequestHandle(item)}>Create Lesson</Button> : null}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={lessonRequests.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
            </CardContent>
        </Card>
        </>
    )
}

export default LessonRequestsTable;