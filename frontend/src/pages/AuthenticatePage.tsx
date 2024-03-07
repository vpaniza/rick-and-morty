import { useLocation } from "react-router-dom"
import { LoginForm } from "../components/form/LoginForm"
import { SignUpForm } from "../components/form/SignUpForm";

export const AuthenticatePage = () => {
  const location = useLocation();
  
  return location.pathname.includes("login") ? 
    <LoginForm />
    :
    <SignUpForm />
}