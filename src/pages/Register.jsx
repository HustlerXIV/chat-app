import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../components/Loading";

export const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password)
        .then(function (data) {
          const storageRef = ref(storage, displayName);

          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            (error) => {
              setErr(true);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  });
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });

                  await setDoc(doc(db, "userChats", res.user.uid), {});
                  setLoading(false);
                  navigate("/");
                }
              );
            }
          );
        })
        .catch(function (error) {
          setLoading(false);
          setErr(true);
        });
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      {loading && <Loading title="Registering..." />}
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Napat Chat</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="display name" required />
            <Email type="email" placeholder="email" required />
            <input type="password" placeholder="password" required />
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
              required
            />
            <div style={{ margin: "0px auto", display: "flex", gap: "10px" }}>
              {img ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <DeleteIcon
                    sx={{ cursor: "pointer", color: "red" }}
                    onClick={() => setImg(null)}
                  />
                  <label style={{ fontSize: "10px" }}>
                    {img?.name.slice(0, 10) + "..."}
                  </label>
                </div>
              ) : (
                <label htmlFor="file">
                  <AddPhotoAlternateIcon sx={{ fontSize: "40px" }} />
                  <span>Add Photo</span>
                </label>
              )}
            </div>
            <button>Sign Up </button>
            {err && <span className="alertError">Something went wrong!</span>}
          </form>
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </>
  );
};

const Email = styled.input`
  width: 400px;

  @media (max-width: 576px) {
    width: 200px;
  }
`;
