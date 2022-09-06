import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import ModalImage from "./ModalImage";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const timestamp = message.date.seconds;
  const date = new Date(timestamp * 1000);
  const datevalues = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  console.log("datevalues", datevalues);

  const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo owner">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="owner"
        />
        <span>{time}</span>
      </div>
      <div className="messageContent">
        <p>
          {message.text}
          {message.img && <ModalImage src={message.img} />}
        </p>
      </div>
    </div>
  );
};

export default Message;
