import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import moment from "moment";

const UserInfo = ({user, coach, player}) => {

    console.log(user);
    
    if (coach) {
        return (
            <Card style={{ height: '100%' }}>
                <CardHeader title="Coach Info"/>
                <CardContent>
                    <Typography>{user.firstname + " " + user.lastname}</Typography>
                    <Typography>{user.email}</Typography>
                    <Typography>{user.phone}</Typography>
                    <Typography>{user.coachingCredentials}</Typography>
                    <Typography>{user.dateStartedCoaching ? "Year started coaching: " + moment.unix(user.dateStartedCoaching / 1000).format('YYYY') : null}</Typography>
                </CardContent>
            </Card>
        )
    }

    if (player) {
        return (
            <Card style={{ height: '100%' }}>
                <CardHeader title="Player Info"/>
                <CardContent>
                    <Typography>{user.firstname + " " + user.lastname}</Typography>
                    <Typography>{user.email}</Typography>
                    <Typography>{user.phone}</Typography>
                    <Typography>{user.hand ? "Handiness: " + user.hand : null}</Typography>
                    <Typography>{user.handicap ? "Handicap: " + user.handicap : null}</Typography>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card style={{ height: '100%' }}>
            <CardHeader title="Owner Info"/>
            <CardContent>
                <Typography>{user.firstname + " " + user.lastname}</Typography>
                <Typography>{user.email}</Typography>
                <Typography>{user.phone}</Typography>
            </CardContent>
        </Card>
    )
}

export default UserInfo;