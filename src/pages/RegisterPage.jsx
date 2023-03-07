import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeAuthRequest } from "../utils/makeRequest";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = async () => {
    const data = await makeAuthRequest(
      { url: "/register", method: "post" },
      {
        data: {
            username: username,
            password: password
        },
      }
    );
    if(data) navigate('/login');
  };

  return (
    <div className="login-container">
      <input
        type="text"
        value={username}
        placeholder="enter username"
        onChange={handleUsername}
      />
      <input
        type="password"
        value={password}
        placeholder="enter password"
        onChange={handlePassword}
      />
      <button onClick={handleRegister}>Register</button>
      <Link to = '/login'>Login</Link>
    </div>
  );
}
