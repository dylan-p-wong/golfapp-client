import SchoolIcon from '@material-ui/icons/School';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import { green } from '@material-ui/core/colors';
  
  const LessonsTaught = (props) => (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL LESSONS TAUGHT
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              12
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
  