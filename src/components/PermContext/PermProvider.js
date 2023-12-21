import React, { useState, useContext, useEffect } from 'react';
import { PermDataContext } from './PermData.context';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { UserDataContext } from '../UserContext/UserData.context';

const PermProvider = (props) => {
  const { user } = useContext(UserDataContext);
  const [permData, setPermData] = useState();
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
   
      axios.get("user/get_permissions")
        .then((response) => {
          if (response.data) {
            setPermData(response.data.result);
          }
        })
        .catch((error) => {
            setPermData(null);
        })

    
  }, [user.isAuthenticated]);


  return (
    <PermDataContext.Provider value={{ permData, setPermData }}>
      {props.children}
      {console.log('perm from provieder',permData)}
    </PermDataContext.Provider>
  );
};

export default PermProvider;