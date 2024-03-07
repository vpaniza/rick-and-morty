import "./Header.css";
interface HeaderProps {
  title?: string;
  subtitle?: string;
  color?: string;
}

export const Header =  ({title = "", subtitle = "", color="#FFFFFF"}: HeaderProps) => {
  return(
    <header>
      <h1 style={{color: color}}>{title}</h1>
      <h5>{subtitle}</h5>
    </header>
  )
};