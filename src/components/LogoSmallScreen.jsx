import { Link } from "react-router-dom";
import styles from "./LogoSmallScreen.module.css";

function LogoSmallScreen() {
  return (
    <Link to="/" className={styles["logo-container"]}>
      <img
        src="/logo-small.png"
        alt="WideGlobe logo small"
        className={styles.logo}
      />
    </Link>
  );
}

export default LogoSmallScreen;
