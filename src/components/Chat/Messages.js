import React from "react";
import Message from "./Message";

const Messages = () => {
  const messages = []; // Dummy messages for design purposes

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
