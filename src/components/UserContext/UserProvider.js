import { message } from "antd";
import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";
import React, { useState } from "react";
// import useAxios from "../useAxiosHook.interceptor";
import { UserDataContext } from "./UserData.context";

const UserProvider = (props) => {
//   const axios = useAxios();
  const token = Cookies.get("token");
  const refresh = Cookies.get("refresh");
  
  const [user, setUser] = useState({
    token,
    isAuthenticated: refresh && token ? true : false,
  });



  {console.log('userr',user)}
  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserDataContext.Provider value={contextValue}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserProvider;