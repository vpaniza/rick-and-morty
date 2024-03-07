import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../hooks/useUser";
import "./Form.css";

interface UserIn {
  username: string;
  password: string;
}

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { signupMutation } = useSignUp();
  const [userDetails, setUserDetails] = useState<UserIn>({username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (userDetails.username.length < 8) {
      setError("Username must contain at least 8 characters");
      return;
    };
    try {
      const response = signupMutation(userDetails);
      setError(null);
      return response
    } catch (err) {
      console.error(err);
      setError("An error occurred while signing up");
    };
  };

  return(
    <div className="form">
      <h2>Sign up</h2>

      <form className="auth-form">
        <input 
          type="text" 
          placeholder="Enter a username" 
          value={userDetails?.username} 
          onChange={(e) => setUserDetails({...userDetails, username: e.target.value})}
        />
        <input type="password" 
          placeholder="Create a password" 
          value={userDetails?.password} 
          onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
        />
        {error && <p>Error: {error}</p>}
        <button 
          disabled={!userDetails.username.length || !userDetails.password.length}
          onClick={(e) => handleSubmit(e)}
        >
          Sign up
        </button>
      </form>

      <div className="switch-form">
        <p>Already have an account?</p>
        <button onClick={()=> navigate("/login")}>Login</button>
      </div>
    </div>
  )
}