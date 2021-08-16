import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Card, CardHeader, Button, CardContent } from '@material-ui/core';
import Pricing from 'src/components/pricing/Pricing';
import Tiers from 'src/components/pricing/Tiers';
import { useQuery } from '@apollo/client';
import { USER_TIER_INFO } from 'src/graphql/user';
import Spinner from 'src/components/spinner/Spinner';
import { ME } from 'src/graphql/auth';

const Subscriptions = () => {
  const { loading, error, data } = useQuery(USER_TIER_INFO);
  const { loading: userLoading, error: userError, data: userData } = useQuery(ME); 
  
  if (error || userError) return <h1>Error</h1>
  if (loading || userLoading) return <Spinner />

  return (
  <>
    <Helmet>
      <title>Subscriptions | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Tiers showPlayerTier={userData.userInfo.playerAccount} showCoachTier={userData.userInfo.coachAccount} playerTier={data.userTier.playerTier.tier} coachTier={data.userTier.coachTier.tier}/>
      </Container>
    </Box>
  </>
)};

export default Subscriptions;
