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
import PropTypes from 'prop-types';

const states = [
  {
    value: '',
    label: ''
  },
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const AccountCourseDetails = (props) => {
  const { homeCourse, homeCourseCity, homeCourseProvince, homeCourseCountry } = props;

  const [values, setValues] = useState({
    homeCourse: homeCourse,
    homeCourseProvince: homeCourseProvince,
    homeCourseCountry: homeCourseCountry,
    homeCourseCity: homeCourseCity
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSave = async () => {
    await props.updateUser({ variables: {info: values}});
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
          title="Home Course Info"
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
                label="Course Name"
                name="homeCourse"
                onChange={handleChange}
                value={values.homeCourse}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="City"
                name="homeCourseCity"
                onChange={handleChange}
                value={values.homeCourseCity}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="homeCourseCountry"
                onChange={handleChange}
                value={values.homeCourseCountry}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Province"
                name="homeCourseProvince"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.homeCourseProvince}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
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

AccountCourseDetails.propTypes = {
  updateUser: PropTypes.func.isRequired
}

export default AccountCourseDetails;
