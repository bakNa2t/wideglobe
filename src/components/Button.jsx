import PropTypes from "prop-types";

import styles from "./Button.module.css";

function Button({ children, onClick, type }) {
  Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.string,
  };

  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
