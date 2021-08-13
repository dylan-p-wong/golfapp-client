import SchoolIcon from '@material-ui/icons/School';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography
  } from '@material-ui/core';
  import { green } from '@material-ui/core/colors';
  
  const LessonsTaught = (props) => (
    <Card {...props}>
      <CardHeader title="Lessons Taught"/>
      <CardContent>
        <Grid
          container
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {props.total}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              align="center"
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              THIS MONTH
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {props.month}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <SchoolIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
  export default LessonsTaught;
  