import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/auth';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import moment from 'moment';
import PropTypes from 'prop-types';

const AccountCoachDetails = (props) => {
  const { coachingCredentials, dateStartedCoaching } = props;
  const [selectedDate, setSelectedDate] = useState(dateStartedCoaching ? moment.unix(dateStartedCoaching / 1000) : null);

  const [values, setValues] = useState({
    coachingCredentials,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.startOf('year'));
  }

  const onSave = async () => {
    await props.updateUser({ variables: {info: {...values, dateStartedCoaching: selectedDate.unix() * 1000 }}});
  }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Teaching Info"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Coaching Credentials"
                name="coachingCredentials"
                onChange={handleChange}
                value={values.coachingCredentials}
                variant="outlined"
                required
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                  <KeyboardDatePicker
                      views={["year"]}
                      fullWidth
                      autoOk={true}
                      required
                      label="Year"
                      value={selectedDate}
                      format="YYYY"
                      onChange={handleDateChange}
                  />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={onSave}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

AccountCoachDetails.propTypes = {
  updateUser: PropTypes.func.isRequired
}

export default AccountCoachDetails;
