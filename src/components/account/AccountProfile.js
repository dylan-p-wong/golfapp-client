import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/auth';
import getInitials from 'src/utils/getInitials';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const AccountProfile = (props) => {
  const { createdAt, updatedAt, firstname, avatar, lastname } = props;

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={avatar}
          >
            {getInitials(firstname + " " + lastname)}
          </Avatar>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {firstname + " " + lastname}
          </Typography>
          {/* <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography> */}
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Joined Date: {`${moment.unix(createdAt / 1000).format("DD/MM/YYYY")}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Updated Date: {`${moment.unix(updatedAt / 1000).format("DD/MM/YYYY")}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
