import "../styles/Login.scss";
interface RegisterProp {
  setRegisterDisplay: (value: boolean) => void;
}
function Register({ setRegisterDisplay }: RegisterProp) {
  const handleDisplay = () => {
    setRegisterDisplay(false);
  };
  return (
    <div className="loginContainer">
      <div className="loginDiv">
        <div className="loginTitleDiv">
          <button onClick={handleDisplay}>X</button>
          <h1>Register</h1>
        </div>
        <div className="inputsDiv">
          <input placeholder="E-Mail Adresse" type="email"></input>
          <input placeholder="Password" type="password"></input>
          <input placeholder="Confirm Password" type="password"></input>
        </div>
        <div className="buttonsDiv">
          <button className="regButton">Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
