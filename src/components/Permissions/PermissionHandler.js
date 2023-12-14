
import React, { createContext, useContext, useState, useEffect } from 'react';
import useAxios from '../Auth/useAxiosHook.interceptor';

const PermissionsContext = createContext([]);

export const usePermissions = () => useContext(PermissionsContext);

const PermissionHandler = () => {
  const [permissions, setPermissions] = useState();
  const axios = useAxios();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('user/get_permissions');
        setPermissions(response.data.result);
        console.log('aya',response.data.result);
        console.log('aya2',permissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  },[]);

  return (
    <PermissionsContext.Provider value={permissions}>

    </PermissionsContext.Provider>
  );
};

export default PermissionHandler;
