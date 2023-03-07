import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeAuthRequest } from "../utils/makeRequest";
export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    const data = await makeAuthRequest(
      { url: "/login", method: "post" },
      {
        data: {
          username: username,
          password: password,
        },
      }
    );
    if(data.token){
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/');
    };
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
      <button onClick={handleLogin}>Login</button>
      <Link to = '/register'>Register</Link>
    </div>
  );
}
