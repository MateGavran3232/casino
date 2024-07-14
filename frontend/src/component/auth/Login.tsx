import React, { useRef, useState } from "react";
import "../../styles/Login.scss";
import useDataStore from "../../store/useDataStore";
// @ts-ignore
import ThreeDots from "../../assets/three-dots.svg";
type LoginDataTypes = {
  username: string;
  password: string;
};

function Login() {
  const { handleLogin, setIsLoginOpen, setIsRegisterOpen, isLoggingLoading } =
    useDataStore((state) => ({
      handleLogin: state.handleLogin,
      setIsLoginOpen: state.actions.setIsLoginOpen,
      setIsRegisterOpen: state.actions.setIsRegisterOpen,
      isLoggingLoading: state.isLoggingLoading,
    }));

  const [isFormFilled, setIsFormFilled] = useState(false);

  const loginData = useRef<LoginDataTypes>({
    username: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    loginData.current = {
      ...loginData.current,
      [e.target.name]: e.target.value,
    };
    setIsFormFilled(!Object.values(loginData.current).includes(""));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isFormFilled) {
      handleLogin(loginData.current);
    }
  };

  return (
    <div
      className="loginContainer "
      onKeyDown={(e) => handleKeyDown(e)}
      tabIndex={0}
    >
      <form className="loginDiv" method="POST">
        <div className="loginTitleDiv">
          <button onClick={() => setIsLoginOpen(false)}>X</button>
          <h1>Login</h1>
        </div>
        <div className="inputsDiv">
          <input
            placeholder="Username"
            type="username"
            name="username"
            onChange={handleInput}
          ></input>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleInput}
          ></input>
        </div>
        <div className="buttonsDiv">
          <div className="registerButtonContainer">
            <p>Dont have an account yet?</p>
            <p
              className="registerButton"
              onClick={() => {
                setIsLoginOpen(false);
                setIsRegisterOpen(true);
              }}
            >
              Register here
            </p>
          </div>
          <button
            className="loginButton"
            disabled={!isFormFilled}
            onClick={() => handleLogin(loginData.current)}
          >
            {isLoggingLoading ? (
              <img src={ThreeDots} className="threeDots"></img>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
