import React, { useRef } from "react";
import "../../styles/Login.scss";
import { RegisterProp } from "../../types";
import useDataStore from "../../store/useDataStore";

export type RegisterDataTypes = {
  username: string;
  email: string;
  password: string;
};

function Register() {
  const { setIsRegisterOpen, handleRegister } = useDataStore((state) => ({
    setIsRegisterOpen: state.actions.setIsRegisterOpen,
    handleRegister: state.handleRegister,
  }));

  const registerData = useRef<RegisterDataTypes>({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerData.current = {
      ...registerData.current,
      [e.target.name]: e.target.value,
    };
  };
  return (
    <div className="loginContainer">
      <div className="loginDiv registerDiv">
        <div className="loginTitleDiv">
          <button onClick={() => setIsRegisterOpen(false)}>X</button>
          <h1>Register</h1>
        </div>
        <form className="inputsDiv regInputsDiv">
          <input
            placeholder="Username"
            type="name"
            name="username"
            onChange={handleInput}
          ></input>
          <input
            placeholder="E-Mail Adresse"
            type="email"
            name="email"
            onChange={handleInput}
          ></input>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleInput}
          ></input>
          <input placeholder="Confirm Password" type="password"></input>
        </form>
        <div className="buttonsDiv">
          <button
            className="regButton"
            onClick={() => handleRegister(registerData.current)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
