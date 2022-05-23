import axios from "axios";
import { useContext , useRef} from "react";
// import { Link } from "react-router-dom";
import { Context } from '../../context/Context';
import {LoginStart, LoginSuccess, LoginFailure} from '../../context/Action'
import "./login.css";

export default function Login() {
const userRef = useRef()
const passwordRef = useRef()

const {dispatch , isFetching, error} =useContext(Context)



const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(LoginStart());
  try {
    const res = await axios.post("/auth/login", {
      username: userRef.current.value,
      password: passwordRef.current.value
    });
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
  } catch (error) {
    dispatch(LoginFailure())
    
  }
}

// console.log(user);
// console.log(isFetching);
// console.log(error);


  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
           className="loginInput" 
           type="text" 
           placeholder="Enter your username..." 
           ref={userRef}/>
        <label>Password</label>
        <input 
           className="loginInput" 
           type="password" 
           placeholder="Enter your password..." 
           ref={passwordRef}/>
        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching?"processing..":"Login"}</button>
        {error && <span style={{color:'red'}}>something is wrong</span>}
      </form>
        
    </div>
  );
}
