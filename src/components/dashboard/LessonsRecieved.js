import BookIcon from '@material-ui/icons/Book';import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    CardHeader
  } from '@material-ui/core';
  import { green } from '@material-ui/core/colors';
  
  const LessonsRecieved = (props) => (
    <Card {...props}>
      <CardHeader title="Lessons Recieved"/>
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
              <BookIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
  export default LessonsRecieved;
  