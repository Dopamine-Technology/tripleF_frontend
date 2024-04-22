import React from 'react';

function Navbar() {
  // Dummy data for user
  const user = {
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg" 
  };

  return (
    <div className="navbar">
      <img src={user.image} alt={user.name} className="user-avatar" />
      <h2 className="user-name">{user.name}</h2>
    </div>
  );
}

export default Navbar;
