import React, {useEffect} from 'react';
import { useHistory } from 'react-router';

const Logout = () => {     
    const { push } = useHistory();
    useEffect(() => {
        localStorage.clear('token')
        //clears your token so you're no longer authorized
        push('/login')
        //brings you back to login page
    }, [])
    
    return(<div></div>);
    //this component doesn't display anything because it just logs you out and immediately directs you back to login
}

export default Logout;

// Task List
// 1. On mount, execute a http request to the logout endpoint.
// 2. On a successful request, remove the token from localStorage and redirect to the login page.