import { useState } from "react";
import { Button, Card, CardHeader, Divider, Box, FormControlLabel, Checkbox, CardContent, Typography } from "@material-ui/core";

const AccountTypeDetails = (props) => {
    const { playerAccount, coachAccount } = props;

    const [values, setValues] = useState({
        playerAccount,
        coachAccount
    });

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.checked
        });
    };

    const onSave = async () => {
        await props.updateUser({ variables: {info: {...values }}});
    }

    return (
        <form>
            <Card>
                <CardHeader
                    title="Account Type"
                />
                <Divider />
                <CardContent>
                    <Box display="flex" flexDirection="column" p={2}>
                        <FormControlLabel
                        control={(
                            <Checkbox
                            name="playerAccount"
                            color="primary"
                            checked={values.playerAccount}
                            onChange={handleChange}
                            />
                        )}
                        label="Player Account"
                        />
                        <Box ml={5}>
                            <Typography variant="h6">Record swings</Typography>
                            <Typography variant="h6">Analyze swings</Typography>
                            <Typography variant="h6">Take lessons</Typography>
                        </Box>
                        <FormControlLabel
                        control={(
                            <Checkbox
                            name="coachAccount"
                            color="primary"
                            checked={values.coachAccount}
                            onChange={handleChange}
                            />
                        )}
                        label="Coaching Account"
                        />
                        <Box ml={5}>
                            <Typography variant="h6">Upload swings</Typography>
                            <Typography variant="h6">Analyze swings</Typography>
                            <Typography variant="h6">Create lessons</Typography>
                        </Box>              
                    </Box>
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
                <Divider />
            </Card>
        </form> 
    )
}

export default AccountTypeDetails;