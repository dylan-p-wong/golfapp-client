import { useMutation } from '@apollo/client';
import { TablePagination, Autocomplete, DialogActions, Dialog, DialogTitle, DialogContent, TextField, Box, Container, Grid, Card, CardHeader, Button, CardContent, Divider, Typography, Chip, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import moment from 'moment';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CANCEL_LESSON_REQUEST, CREATE_LESSON_REQUEST, GET_USER_LESSON_REQUESTS_PLAYER } from 'src/graphql/lesson';

const LessonRequestsTable = (props) => {
    const navigate = useNavigate();
        
    const { lessonRequests, coaches } = props;
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [selectedCoach, setSelectedCoach] = useState(null);
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState("");
    const [error, setError] = useState(null);

    const [createLessonRequest, { loading: createLessonRequestLoading, error: createLessonRequestError, data: createLessonRequestData }] = useMutation(CREATE_LESSON_REQUEST, {
        refetchQueries: [{query: GET_USER_LESSON_REQUESTS_PLAYER}],
        onError: setError,
        onCompleted: () => {; toast("Lesson Request Sent!")}
    });

    const [cancelLessonRequest, { loading: cancelLessonRequestLoading, error: cancelLessonRequestError, data: cancelLessonRequestData }] = useMutation(CANCEL_LESSON_REQUEST, {
        refetchQueries: [{query: GET_USER_LESSON_REQUESTS_PLAYER}],
        onError: setError,
        onCompleted: () => toast("Lesson Request Cancelled!")
    });
    
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const cancelLessonRequestHandle = async (lessonRequestId) => {
        cancelLessonRequest({ variables: { lessonRequestId }});
    }

    const addLessonRequestHandle = async () => {
        if (selectedCoach) {
            createLessonRequest({ variables: { note, coachId: selectedCoach._id }});
            setOpen(false);
        } else {
            toast("Please select a coach");
        }
    }

    if (error) {
        toast(error.message);
        setError(null);
    }

    return (
        <>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>{"Select Coach"}</DialogTitle>
          <DialogContent>
            <TextField margin='normal' fullWidth label="Note" placeholder="Swing fix" onChange={e => setNote(e.target.value)}/>
            <Autocomplete
              onChange={(event, newValue) => { setSelectedCoach(newValue) }}
              style={{ width: 300 }} 
              options={coaches}
              getOptionLabel={(option) => option.email}
              renderInput={(params) => <TextField {...params} label="Coach" variant="outlined"/>}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" size="small" onClick={addLessonRequestHandle}>Create Request</Button>
          </DialogActions>
        </Dialog>
        <Card>
            <CardHeader title="Requested Lessons" action={<Button color="primary" variant="contained" size="small" onClick={() => setOpen(true)}>Request Lesson</Button>}/>
            <CardContent>
            <PerfectScrollbar>
                <Box>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>
                        Coach
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
                            {item.coach.firstname + " " + item.coach.lastname}
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
                            {item.lesson && item.lesson.isCompleted ? <Button onClick={() => navigate(`/app/lesson/${item.lesson._id}`, { replace: true })} variant="contained" size="small">View</Button> : item.isCancelled ? null : <Button variant="contained" size="small" onClick={() => cancelLessonRequestHandle(item._id)}>Cancel</Button>}
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