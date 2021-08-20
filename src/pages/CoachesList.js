import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CoachListToolbar from 'src/components/coaches/CoachListToolbar';
import customers from 'src/__mocks__/customers'
import { GET_COACHES } from 'src/graphql/auth';
import { useQuery } from '@apollo/client';
import CoachesList from 'src/components/coaches/CoachesList';
import Spinner from 'src/components/spinner/Spinner';

const CustomerList = () => {
  const { loading: coachesLoading, error: coachesError, data: coachesData} = useQuery(GET_COACHES);

  if (coachesLoading) return <Spinner />
  if (coachesError) return <h1>Error</h1>

  return (
  <>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CoachListToolbar />
        <Box sx={{ pt: 3 }}>
          <CoachesList coaches={coachesData.getCoaches}/>
        </Box>
      </Container>
    </Box>
  </>
)};

export default CustomerList;
