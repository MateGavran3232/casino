import React, { useRef } from "react";
import "../../styles/Login.scss";
import { LoginProps } from "../../types";
import useDataStore from "../../store/useDataStore";
import { Link } from "react-router-dom";

type LoginDataTypes = {
  username: string;
  password: string;
};

function Login({ setLoginDisplay }: LoginProps) {
  const handleDisplay = () => {
    setLoginDisplay(false);
  };

  const loginData = useRef<LoginDataTypes>({
    username: "",
    password: "",
  });

  const { handleLogin } = useDataStore((state) => ({
    handleLogin: state.handleLogin,
  }));

  const handeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    loginData.current = {
      ...loginData.current,
      [e.target.name]: e.target.value,
    };
  };

  return (
    <div className="loginContainer">
      <div className="loginDiv">
        <div className="loginTitleDiv">
          <button onClick={handleDisplay}>X</button>
          <h1>Login</h1>
        </div>
        <div className="inputsDiv">
          <input
            placeholder="Username"
            type="username"
            name="username"
            onChange={handeInput}
          ></input>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handeInput}
          ></input>
          <div className="checkboxDiv">
            <input type="checkbox"></input>
            <p>Remember password</p>
          </div>

          <p>Forgot Password?</p>
        </div>
        <div className="buttonsDiv">
          <div className="registerButtonContainer">
            <p>Dont have an account yet?</p>
            <p className="registerButton">Register here</p>
          </div>
          <button
            className="loginButton"
            onClick={() => handleLogin(loginData.current)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
