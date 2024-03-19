import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo-globe.png" alt="WideGlobe logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
