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
  CardHeader
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { useNavigate } from 'react-router';

const CoachesList = ({ coaches, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
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
                    {`${coach.homeCourse}, ${coach.homeCourseCity}, ${coach.homeCourseProvince}, ${coach.homeCourseCountry}`}
                  </TableCell>
                  <TableCell>
                    {coach.coachingCredentials}
                  </TableCell>
                  <TableCell>
                    {coach.rating}
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
  );
};

CoachesList.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CoachesList;
