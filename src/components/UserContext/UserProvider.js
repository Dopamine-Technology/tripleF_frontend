import { message } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { UserDataContext } from "./UserData.context";

const UserProvider = (props) => {

  const token = Cookies.get("token");
  const user_type=Cookies.get("profileType");

  
  const [user, setUser] = useState({
    token,
    isAuthenticated:  token ? true : false,
    user_type
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