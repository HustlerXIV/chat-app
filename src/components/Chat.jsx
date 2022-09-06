import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>
          {data.user.displayName
            ? data.user?.displayName
            : "Please select who you want to chat with"}
        </span>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
