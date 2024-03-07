import { Outlet } from "react-router-dom";
import "./PageLayout.css";

export const PageLayout = () => {
  return(
    <div className="page">
      <Outlet />
    </div>
  )
}