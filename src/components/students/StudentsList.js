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
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { ADD_STUDENT, USER_STUDENTS, USER_TOTALS } from 'src/graphql/user';

const StudentsList = ({ students, players, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [addStudent, { loading, data }] = useMutation(ADD_STUDENT, {
    onError: setError,
    refetchQueries: [{query: USER_STUDENTS}, {query: USER_TOTALS}],
    onCompleted: () => toast("Student Added")
  });

  if (error) {
    toast(error.message);
    setError(null);
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const addStudentHandle = () => {
      if (selectedUser) {
        addStudent({ variables: { playerId: selectedUser._id }});
        setOpen(false);
      } else {
        toast("Please select a player");
      }
  }

  return (
    <>
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogTitle>{"Select Player"}</DialogTitle>
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
        <Button color="primary" variant="contained" size="small" onClick={addStudentHandle}>Add Student</Button>
        </DialogActions>
    </Dialog>
    <Card {...rest}>
      <CardHeader title="Students" action={<Button color="primary" variant="contained" size="small" onClick={() => setOpen(true)}>ADD STUDENT</Button>}/>
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
                  Handiness
                </TableCell>
                <TableCell>
                  Handicap
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.slice(0, limit).map((student) => (
                <TableRow
                  hover
                  key={student._id}
                >
                  <TableCell onClick={() => navigate(`/app/profile/${student._id}`, { replace: true })}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={student.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(student.firstname + " " + student.lastname)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${student.firstname} ${student.lastname}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {student.email}
                  </TableCell>
                  <TableCell>
                    {student.phone}
                  </TableCell>
                  <TableCell>
                    {student.homeCourse && student.homeCourseCity && student.homeCourseProvince && student.homeCourseCountry ? `${student.homeCourse}, ${student.homeCourseCity}, ${student.homeCourseProvince}, ${student.homeCourseCountry}` : null}
                  </TableCell>
                  <TableCell>
                    {student.hand}
                  </TableCell>
                  <TableCell>
                    {student.handicap}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" onClick={() => window.open(`mailto:${student.email}`)}>Contact</Button>             
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={students.length}
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

export default StudentsList;
