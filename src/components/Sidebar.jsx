import { Outlet, useNavigate } from "react-router-dom";

import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import { HiXMark } from "react-icons/hi2";

import styles from "./Sidebar.module.css";

import PropTypes from "prop-types";

function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  isSidebarAbsolute,
  setIsSidebarAbsolute,
}) {
  Sidebar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    isSidebarAbsolute: PropTypes.bool.isRequired,
    setIsSidebarOpen: PropTypes.func.isRequired,
    setIsSidebarAbsolute: PropTypes.func.isRequired,
  };

  const navigate = useNavigate();

  return (
    <aside className={`${isSidebarOpen ? styles["sidebar-open"] : ""}`}>
      <div
        className={`${styles.sidebar} ${
          isSidebarAbsolute ? styles["sidebar-absolute"] : ""
        }`}
      >
        <Logo />
        <AppNav />
        <Outlet />
        <Footer />
        <button
          className={styles["sidebar-icon"]}
          onClick={() => {
            setIsSidebarOpen(false);
            setIsSidebarAbsolute(true);
            navigate("/app/cities");
          }}
        >
          <HiXMark />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
