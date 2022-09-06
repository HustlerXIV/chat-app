import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import Loading from "../components/Loading";

export const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password);
      setLoading(false);

      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      {loading && <Loading title="Signing in..." />}
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Napat Chat</span>
          <span className="title">Welcome!</span>
          <form onSubmit={handleSubmit}>
            <Email type="email" placeholder="email" required />
            <input type="password" placeholder="password" required />
            <button>Sign In</button>
            {err && <span>Something went wrong!</span>}
          </form>

          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
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
