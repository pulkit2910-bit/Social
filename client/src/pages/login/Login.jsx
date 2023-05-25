import React, { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password : password.current.value }, dispatch);
    if (error && error.response.data.status === 400) alert(error.response.data.message);
    if (error && error.response.data.status === 404) alert(error.response.data.message);
  }

  return (
    <div className="Login">
      <form className="Login-form" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <div className="username">
          <label>Email</label>
          <input type="email" name="email" ref={email} />
        </div>
        <div className="password">
          <label>Password</label>
          <input type="password" name="password" ref={password} />
        </div>

        <button className="button auth-btn" type="submit" disabled={isFetching}>
          {isFetching ? "Loading..." : "Login"}
        </button>

        <div className="register">
          <Link to="/register" className="register_link">
            <h4>Create an account</h4>
          </Link>
        </div>


      </form>
    </div>
  );
};

export default Login;
