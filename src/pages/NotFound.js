import React,{useContext} from 'react';
import NavBar from '../components/Layout/Navbar';
import CombinedNavbars from '../components/Register/Navbar';
import { UserDataContext } from '../components/UserContext/UserData.context';
import NotFoundContainer from '../components/NotFound/NotFoundContainer';
import { Link } from 'react-router-dom';

function NotFound() {
    const {user}=useContext(UserDataContext);
    return(
        <div style={{overflowY:'hidden'}}>
            {user.isAuthenticated?<NavBar />:<CombinedNavbars />}
           <NotFoundContainer />
           <Link to={user.isAuthenticated?'/home':'/'} style={{display:'flex',justifyContent:'center',alignItems:'center',textDecoration:'none'}}>Back to previous page</Link>
        </div>
    )
}

export default NotFound;