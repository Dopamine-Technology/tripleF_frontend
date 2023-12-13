import React,{useContext} from 'react'
import { UserDataContext } from '../components/UserContext/UserData.context';

function Test() {
    const { user } = useContext(UserDataContext);

    return (<p>Aya
        {user}
        {console.log('userrr',user)}
    </p>)
}

export default Test;