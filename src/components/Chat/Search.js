import React, { useContext, useState } from "react";
import { UserDataContext } from '../UserContext/UserData.context';

const Search = () => {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);

  const {user}=useContext(UserDataContext);

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat">
          <img src={user.userData.image} alt="" />
          <div className="userChatInfo">
            <span>{user.userData.first_name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;