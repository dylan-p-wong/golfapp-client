const { Typography, LinearProgress } = require("@material-ui/core")
const { TextField, Box, Grid, Button, Card, CardHeader, Divider } = require("@material-ui/core")
import { useQuery } from '@apollo/client';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import { USER_NOTIFICATIONS } from 'src/graphql/user';
import Spinner from '../spinner/Spinner';

const Activity = (props) => {

    const { data, loading, error } = useQuery(USER_NOTIFICATIONS, { variables: { count: 3 } });

    if (loading) return <Spinner />
    if (error) return <h1>Error</h1>

    return (
        <Card {...props}>
            <CardHeader title="Activity"/>
            {data.userNotifications.map(item => {
                return (
                    <Box m={2} key={item.createdAt}>
                        <Card m={3}>
                            <Box p={2}>
                                <Typography align="center">{item.title}</Typography>
                            </Box>
                            <Divider />
                            <Box p={1} display="flex" alignItems="center">
                                <AccessTimeIcon color="action" />
                                <Typography align="left" variant="body2" color="textSecondary" pl={1}>{moment.unix(item.createdAt / 1000).fromNow()}</Typography>
                            </Box>
                        </Card>
                    </Box>
                )
            })}
        </Card>
    )
}

export default Activity;