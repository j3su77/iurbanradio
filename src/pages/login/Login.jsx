import { useContext, useRef } from "react";
import Styles from "./login.module.css";
import { Context } from "../../context/Context";
import axios from "axios";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching, apiURL } = useContext(Context);
  console.log(isFetching);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(apiURL + "/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/")
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  console.log(isFetching);

  return (
    <div className={Styles.container_login}>
      <span className={Styles.loginTitle}>Login</span>
      <form className={Styles.loginForm} onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className={Styles.loginInput}
          type="text"
          id="username"
          placeholder="Enter your username"
          ref={userRef}
        />

        <label>Password</label>
        <input
          className={Styles.loginInput}
          type="password"
          id="email"
          placeholder="Enter your password"
          ref={passwordRef}
        />

        <button className={Styles.loginButton} disabled={isFetching}>
          login
        </button>
      </form>
     
    </div>
  );
};

export default Login;
