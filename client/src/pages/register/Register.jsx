import React, { useRef, useState } from "react";
import "./Register.css";
import { registerCall } from "../../apiCalls";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const email = useRef();
  const name = useRef();
  const username = useRef();
  const password = useRef();

  const [img, setImage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("email", email.current.value);
    formData.append("username", username.current.value);
    formData.append("password", password.current.value);
    formData.append("profile_pic", img);

    registerCall(formData);
    navigate("/login");
  }

  return (
    <div className="Register">
      <form className="Register-form" onSubmit={handleSubmit}>
        <h3>Register</h3>

        <div className="profile_pic">
          <label>Profile Pic</label>
          <input type="file" name="profile_pic" onChange={handleChange} />
        </div>
        <div className="name">
          <label>Name</label>
          <input type="text" name="name" required ref={name} />
        </div>
        <div className="username">
          <label>Username</label>
          <input type="text" name="username" required ref={username} />
        </div>
        <div className="email">
          <label>Email</label>
          <input type="email" name="email" required ref={email} />
        </div>
        <div className="password">
          <label>Password</label>
          <input type="password" name="password" required minLength="4" ref={password} />
        </div>

        <button className="button auth-btn" type="submit">Register</button>
        
      </form>
    </div>
  );
};

export default Register;
