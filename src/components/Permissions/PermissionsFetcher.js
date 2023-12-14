import useAxios from '../Auth/useAxiosHook.interceptor';
import React, { useEffect, useState } from 'react';
import PermissionHandler from './PermissionHandler'; // Import the PermissionHandler component

const PermissionsFetcher = () => {
  const [permissions, setPermissions] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('user/get_permissions');
        setPermissions(response.data.result);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <PermissionHandler permissions={permissions} />
  );
};

export default PermissionsFetcher;
