import BookIcon from '@material-ui/icons/Book';import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import { green } from '@material-ui/core/colors';
  
  const LessonsRecieved = (props) => (
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
              TOTAL LESSONS RECIEVED
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              11
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
              <BookIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
  export default LessonsRecieved;
  