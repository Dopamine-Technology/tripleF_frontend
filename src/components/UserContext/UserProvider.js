import React, { useState, useEffect } from 'react';
import { UserDataContext } from './UserData.context';
import useAxios from '../Auth/useAxiosHook.interceptor';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Cookies from 'js-cookie';

const UserProvider = (props) => {
  const [user, setUser] = useState({
    token: Cookies.get('token'),
    isAuthenticated: Cookies.get('token') ? true : false,
    // user_type: Cookies.get('profileType'),
    userData: {},
    loading: true,
  });

  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.isAuthenticated) {
          const response = await axios.get('user/profile');
          setUser((prevUser) => ({
            ...prevUser,
            userData: response.data.result,
          }));
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
        // Handle error, e.g., show a message
      } finally {
        setUser((prevUser) => ({
          ...prevUser,
          loading: false,
        }));
      }
    };

    fetchData();
  }, [user.isAuthenticated]);

  if (user.loading) {
    return <LoadingScreen />;
  }

  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserDataContext.Provider value={contextValue}>
      {props.children}
      {console.log('ya rab',user)}
    </UserDataContext.Provider>
  );
};

export default UserProvider;
