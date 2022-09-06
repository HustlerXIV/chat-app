import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactLoading from "react-loading";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {},
        () => {
          setLoading(true);
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
          setLoading(false);
        }
      );
    } else {
      setLoading(true);
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      setLoading(false);
    }

    setText("");
    setImg(null);

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder={
          data.chatId !== "null"
            ? "Type something..."
            : "Please select who you want to chat with"
        }
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {img ? (
          <>
            <DeleteIcon
              onClick={() => setImg(null)}
              sx={{ cursor: "pointer", color: "red" }}
            />
            <label style={{ fontSize: "10px" }}>
              {img.name.slice(0, 10) + "..."}
            </label>
          </>
        ) : (
          <label
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            htmlFor="file"
          >
            <ImageIcon />
          </label>
        )}

        <button
          onClick={handleSend}
          disabled={data.chatId === "null" ? true : false}
        >
          {loading ? (
            <ReactLoading
              type="spin"
              color="#fff"
              height={"23px"}
              width={"23px"}
            />
          ) : (
            <SendIcon />
          )}
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
