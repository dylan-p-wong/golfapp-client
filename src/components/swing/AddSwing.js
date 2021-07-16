import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Button, Divider, Input, TextField, LinearProgress } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from "react";
import MomentUtils from "@date-io/moment";
import moment from 'moment';
import Swing from './SwingPlayer';
import { ADD_SWING } from 'src/graphql/swing'; 
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const AddSwing = (props) => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState("2021-01-01");
    const [preview, setPreview] = useState(false);
    const [frontVideoFile, setFrontVideoFile] = useState([]);
    const [sideVideoFile, setSideVideoFile] = useState([]);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [addSwing, { data, loading }] = useMutation(ADD_SWING);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleFileChange = type => (file) => {
        if (type === 'FRONT') {
            setFrontVideoFile(file);
        } else if (type === 'SIDE') {
            setSideVideoFile(file);
        }
    }

    const handlePreview = () => {
        setPreview(!preview);
    }

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    if (data) {
        toast("Swing Added!");
        navigate('/app/mygame', { replace: true });
    }

    const onAddSwing = async () => {
        try {
            const test = await addSwing({ variables: { date: selectedDate, frontVideo: frontVideoFile[0], sideVideo: sideVideoFile[0], note, title: title }});
            console.log(test);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Box p={6}>
            <Box mb={3} display="flex" flexDirection="row">
                <Typography variant='h3' flexGrow={1}>Add Swing</Typography>
                <Button color="primary" variant="contained" onClick={handlePreview}>{ preview ? "Edit" : "Preview"}</Button>
            </Box>
            <Divider />

            { preview ? <Swing frontVideoURL={frontVideoFile.length ? URL.createObjectURL(frontVideoFile[0]) : null} sideVideoURL={sideVideoFile.length ? URL.createObjectURL(sideVideoFile[0]) : null}/> : 
                <Box>
                    <Grid container spacing={3} >
                        <Grid container item xs={6} direction="column" alignItems="center" justify="center">
                            <Typography variant='h5'>Front</Typography>
                            <DropzoneArea onChange={handleFileChange('FRONT')} showAlerts={false} filesLimit={1} maxFileSize={10000000} showFileNames={true} acceptedFiles={["video/mp4"]} initialFiles={frontVideoFile}/>
                        </Grid>
                        <Grid container item xs={6} direction="column" alignItems="center" justify="center">
                            <Typography variant='h5'>Side</Typography>
                            <DropzoneArea onChange={handleFileChange('SIDE')} showAlerts={false} filesLimit={1} maxFileSize={10000000} showFileNames={true} acceptedFiles={["video/mp4"]} initialFiles={sideVideoFile}/>   
                        </Grid>
                    </Grid>
                    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                        <KeyboardDatePicker
                            fullWidth
                            autoOk={true}
                            showTodayButton={true}
                            required
                            label="Date"
                            value={selectedDate}
                            format="YYYY-MM-DD"
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField fullWidth placeholder="Title" onChange={handleTitleChange}/>
                    <TextField 
                        fullWidth
                        placeholder="Enter a note"
                        multiline
                        rows={6}
                        onChange={handleNoteChange}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={onAddSwing} disabled={loading}>Save</Button>
                    {loading && <LinearProgress />}
                </Box>
            }
        </Box>
    )
}

export default AddSwing;