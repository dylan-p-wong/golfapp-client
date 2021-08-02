import { ME } from '../../graphql/auth'
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const requireAuthentication = Component => ({ ...props }) => {
    const { loading, error, data } = useQuery(ME);

    if (loading) {
        return <Spinner />
    }

    if (data && data.userInfo) {
        return <Component {...props}/>
    }

    return <Navigate to='/login'/>
}

const noAuthentication = Component => ({ ...props }) => {
    const { loading, error, data } = useQuery(ME);

    if (loading) {
        return <Spinner />
    }

    if (!data || !data.userInfo) {
        return <Component {...props}/>
    }

    return <Navigate to='/app/dashboard'/>
}

export { requireAuthentication, noAuthentication };