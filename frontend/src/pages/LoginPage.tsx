import { useState } from "react";
import { useLogin } from "../hooks/useUser";
import "./Form.css";
import { useNavigate } from "react-router-dom";

interface UserIn {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginMutation, isError } = useLogin();
  const [userDetails, setUserDetails] = useState<UserIn>({username: "", password: "" });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response =  loginMutation(userDetails);
    return response;
  }

  return(
    <div className="form">
      <h2>Login</h2>

      <form className="auth-form">
        <input 
          type="text" 
          placeholder="Enter your username" 
          value={userDetails?.username} 
          onChange={(e) => setUserDetails({...userDetails, username: e.target.value})}
        />
        <input type="password" 
          placeholder="Password" 
          value={userDetails?.password} 
          onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
        />
        {isError && <p>Invalid credentials</p>}
        <button 
          disabled={!userDetails.username.length || !userDetails.password.length}
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </form>

      <div className="switch-form">
        <p>Don't have an account?</p>
        <button onClick={()=> navigate("/signup")}>Sign up</button>
      </div>
    </div>
  )
}