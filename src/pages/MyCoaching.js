import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Card, CardHeader, Button, CardContent, Dialog, DialogContent, DialogTitle, DialogActions, Autocomplete, TextField } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import customers from 'src/__mocks__/customers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import users from '../__mocks__/customers';

const MyCoaching = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>{"Select Student"}</DialogTitle>
          <DialogContent>
            <Autocomplete
              style={{ width: 300 }} 
              options={users}
              getOptionLabel={(option) => option.email}
              renderInput={(params) => <TextField {...params} label="Student" variant="outlined"/>}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" size="small" onClick={() => navigate('/app/lesson/add', { replace: true })}>Create Lesson</Button>
          </DialogActions>
        </Dialog>
        <Grid
        container
        spacing={3}
        >
          <Grid
            item
            xs={4}
          >
            <Card>
            <CardHeader title="Lesson Requests" action={<Button color="primary" variant="contained" size="small" onClick={() => setOpen(true)}>Create Lesson</Button>}/>
            <CardContent>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <Card>
            <CardHeader title="Drills" action={<Button color="primary" variant="contained" size="small" onClick={() => navigate('/app/swing/add', { replace: true })}>Create Drill</Button>}/>
              <CardContent>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <Card>
              <CardHeader title="Past Lessons"/>
              <CardContent>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <CustomerListResults customers={customers}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default MyCoaching;
