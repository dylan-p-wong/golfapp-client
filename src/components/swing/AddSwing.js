import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Button, Divider, Input, TextField } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from "react";
import MomentUtils from "@date-io/moment";
import moment from 'moment';
import Swing from './Swing';

const AddSwing = (props) => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState("2021-01-01");
    const [preview, setPreview] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleFileChange = (file) => {
        console.log(file);
    }

    const handlePreview = () => {
        setPreview(!preview);
    }

    return (
        <Box p={6}>
            <Box mb={3} display="flex" flexDirection="row">
                <Typography variant='h3' flexGrow={1}>Add Swing</Typography>
                <Button color="primary" variant="contained" onClick={handlePreview}>{ preview ? "Edit" : "Preview"}</Button>
            </Box>
            <Divider />

            { preview ? <Swing /> : 
                <Box>
                    <Grid container spacing={3} >
                        <Grid container item xs={6} direction="column" alignItems="center" justify="center">
                            <Typography variant='h5'>Front</Typography>
                            <DropzoneArea onChange={handleFileChange} showAlerts={false} filesLimit={1} maxFileSize={10000000} showFileNames={true} acceptedFiles={["video/mp4"]}/>
                        </Grid>
                        <Grid container item xs={6} direction="column" alignItems="center" justify="center">
                            <Typography variant='h5'>Side</Typography>
                            <DropzoneArea onChange={handleFileChange} showAlerts={false} filesLimit={1}/>   
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
                    <TextField 
                        fullWidth
                        placeholder="Enter a note"
                        multiline
                        rows={6}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/app/mygame', { replace: true })}>Save</Button>
                </Box>
            }
        </Box>
    )
}

export default AddSwing;