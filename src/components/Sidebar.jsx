import { Outlet } from "react-router-dom";

import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import { HiXMark } from "react-icons/hi2";

import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles["sidebar-open"]}>
      <div className={styles.sidebar}>
        <Logo />
        <AppNav />
        <Outlet />
        <Footer />
        <button className={styles["sidebar-icon"]}>
          <HiXMark />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
