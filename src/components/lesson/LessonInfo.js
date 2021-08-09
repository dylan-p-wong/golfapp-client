import { useMutation } from "@apollo/client";
import { Button, Box, TextField, FormControlLabel, Checkbox, Card, CardHeader, Divider, Grid, CardContent, CardActions, Tooltip } from "@material-ui/core"
import { useState } from "react";
import { toast } from "react-toastify";
import { UPDATE_LESSON } from "src/graphql/lesson";
import UserInfo from '../user/UserInfo';

const LessonInfo = ({ lesson }) => {
    const[error, setError] = useState(null);

    const [updateLesson, { data, loading }] = useMutation(UPDATE_LESSON, {
        onError: setError,
        onCompleted: () => toast("Lesson updated.")
    });

    const [values, setValues] = useState({
        title: lesson.title,
        isCompleted: lesson.isCompleted,
        isPublic: lesson.isPublic,
        // pendingUser: '',
        // viewers: []
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleCheckBoxChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.checked
        });
    };

    const onSave = async () => {
        updateLesson({ variables: { lessonId: lesson._id, info: values }});
    }

    if (error) {
        toast(error.message);
        setError(null);
    }

    return (
        <Card>
        <CardHeader
            // subheader="The information can be edited"
            title="Lesson Info"
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
                <UserInfo user={lesson.player} player/>
            </Grid>
            <Grid
            item
            md={6}
            xs={12}
            >
               <UserInfo coach user={lesson.coach}/> 
            </Grid>
            <Grid
            item
            md={6}
            xs={12}
            >
            <TextField
                fullWidth
                label="Title"
                name="title"
                onChange={handleChange}
                type="text"
                value={values.title}
                variant="outlined"
            />
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
                <FormControlLabel label="Public" control={<Tooltip title="Allow anyone to view the lesson once completed."><Checkbox checked={values.isPublic} color="primary" name="isPublic" onChange={handleCheckBoxChange}/></Tooltip>} />                   
                <FormControlLabel label="Completed" control={ <Tooltip title="Allow the player to see the lesson."><Checkbox checked={values.isCompleted} color="primary" name="isCompleted" onChange={handleCheckBoxChange}/></Tooltip>} />
            </Grid>
            <Grid container item md={6} xs={12} flexDirection="row">
                <Grid item xs={8}>
                <TextField
                    label="Email"
                    name="pendingUser"
                    onChange={handleChange}
                    type="text"
                    value={values.pendingUser}
                    variant="outlined"
                    fullWidth
                />
                </Grid>
                <Grid item xs={4}>
                    <Tooltip title="Let user view the lesson.">
                        <Button fullWidth style={{ height: '100%'}} variant="contained">Add Viewer</Button>
                    </Tooltip>
                </Grid> 
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
            disabled={loading}
        >
            Save details
        </Button>
        </Box>
    </Card>
    )
}

export default LessonInfo;