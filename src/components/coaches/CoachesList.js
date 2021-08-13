import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardHeader,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
  Autocomplete
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { useNavigate } from 'react-router';
import { CREATE_LESSON_REQUEST, GET_USER_LESSON_REQUESTS_PLAYER } from 'src/graphql/lesson';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const CoachesList = ({ coaches, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const navigate = useNavigate();
  const [createLessonRequest, { loading: createLessonRequestLoading, error: createLessonRequestError, data: createLessonRequestData }] = useMutation(CREATE_LESSON_REQUEST, {
    refetchQueries: [{query: GET_USER_LESSON_REQUESTS_PLAYER}],
    onError: setError,
    onCompleted: () => {setOpen(false); toast("Lesson Request Sent!")}
  });

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const addLessonRequestHandle = async () => {
    createLessonRequest({ variables: { note, coachId: selectedCoach._id }});
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
            <TextField fullWidth label="Note" placeholder="Swing fix" onChange={e => setNote(e.target.value)}/>
            <Autocomplete
              value={selectedCoach}
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
    <Card {...rest}>
      <CardHeader title="Coaches"/>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Coaching Credentials
                </TableCell>
                <TableCell>
                  Rating
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coaches.slice(0, limit).map((coach) => (
                <TableRow
                  hover
                  key={coach._id}
                >
                  <TableCell onClick={() => navigate(`/app/profile/${coach._id}`, { replace: true })}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={coach.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(coach.firstname + " " + coach.lastname)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${coach.firstname} ${coach.lastname}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {coach.email}
                  </TableCell>
                  <TableCell>
                    {coach.phone}
                  </TableCell>
                  <TableCell>
                    {coach.homeCourse && coach.homeCourseCity && coach.homeCourseProvince && coach.homeCourseCountry ? `${coach.homeCourse}, ${coach.homeCourseCity}, ${coach.homeCourseProvince}, ${coach.homeCourseCountry}` : null}
                  </TableCell>
                  <TableCell>
                    {coach.coachingCredentials}
                  </TableCell>
                  <TableCell>
                    {coach.rating}
                  </TableCell>
                  <TableCell>
                    <Button style={{ marginRight: 5 }} variant="contained" size="small" onClick={() => window.open(`mailto:${coach.email}`)}>Contact</Button>
                    <Button color="primary" variant="contained" size="small" onClick={() => {setSelectedCoach(coach); setOpen(true)}}>Request Lesson</Button>                  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={coaches.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    </>
  );
};

CoachesList.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CoachesList;
