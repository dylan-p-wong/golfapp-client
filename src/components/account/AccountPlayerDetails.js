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

const hands = [
  {
    value: 'RIGHT',
    label: 'Right'
  },
  {
    value: 'LEFT',
    label: 'Left'
  }
];

const AccountPlayerDetails = (props) => {
  const { hand, handicap } = props;

  const [values, setValues] = useState({
    hand: hand,
    handicap: handicap,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSave = async () => {
      console.log(values);
    await props.updateUser({ variables: { info: {...values, handicap: parseFloat(values.handicap)} }});
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
          title="Golf Info"
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
                label="Select Hand"
                name="hand"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.hand}
                variant="outlined"
              >
                {hands.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Handicap"
                name="handicap"
                onChange={handleChange}
                type="number"
                value={values.handicap}
                variant="outlined"
              />
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

AccountPlayerDetails.propTypes = {
    updateUser: PropTypes.func.isRequired
}
  

export default AccountPlayerDetails;
