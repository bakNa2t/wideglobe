import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiBars3, HiXMark } from "react-icons/hi2";

import Logo from "./Logo";

import styles from "./PageNav.module.css";

function PageNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <header className={`${isNavOpen ? styles["nav-open"] : ""}`}>
      <nav className={styles.nav}>
        <Logo />
        <ul>
          <li>
            <NavLink to="/product" className={styles["nav-a-hovering"]}>
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/pricing" className={styles["nav-a-hovering"]}>
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        </ul>
        <button className={styles["nav-icon"]} onClick={toggleNav}>
          {isNavOpen ? <HiXMark /> : <HiBars3 />}
        </button>
      </nav>
    </header>
  );
}

export default PageNav;
