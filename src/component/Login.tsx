import "../styles/Login.scss";
interface LoginProps {
  setLoginDisplay: (value: boolean) => void;
}
function Login({ setLoginDisplay }: LoginProps) {
  const handleDisplay = () => {
    setLoginDisplay(false);
    console.log(setLoginDisplay);
  };
  return (
    <div className="loginContainer">
      <div className="loginDiv">
        <div className="loginTitleDiv">
          <button onClick={handleDisplay}>X</button>
          <h1>Login</h1>
        </div>
        <div className="inputsDiv">
          <input placeholder="E-Mail Adresse" type="email"></input>
          <input placeholder="Password" type="password"></input>
          <div className="checkboxDiv">
            <input type="checkbox"></input>
            <p>Remember password</p>
          </div>

          <p>Forgot Password?</p>
        </div>
        <div className="buttonsDiv">
          <button className="regButton">Register</button>
          <button className="loginButton">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
