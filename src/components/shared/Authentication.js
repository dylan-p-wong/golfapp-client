import { ME } from '../../graphql/auth'
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';

const requireAuthentication = Component => ({ ...props }) => {
    const { loading, error, data } = useQuery(ME);

    if (loading) {
        return <h1>Loading</h1>
    }

    if (data && data.userInfo) {
        return <Component {...props}/>
    }

    return <Navigate to='/login'/>
}

const noAuthentication = Component => ({ ...props }) => {
    const { loading, error, data } = useQuery(ME);

    if (loading) {
        return <h1>Loading</h1>
    }

    if (!data || !data.userInfo) {
        return <Component {...props}/>
    }

    return <Navigate to='/app/dashboard'/>
}

export { requireAuthentication, noAuthentication };