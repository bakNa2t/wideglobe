import { Link } from "react-router-dom";
import styles from "./LogoSmallScreen.module.css";

function Logo() {
  return (
    <Link to="/">
      <img
        src="/logo-small.png"
        alt="WideGlobe logo small"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;
