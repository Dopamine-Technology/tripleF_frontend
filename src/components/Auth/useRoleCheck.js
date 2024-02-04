import { useContext } from "react";
import { UserDataContext } from "../UserContext/UserData.context";

export function useRoleCheck() {
  const { user } = useContext(UserDataContext);

  return (roles) => roles.includes(user.userData.profile.type_name);
}