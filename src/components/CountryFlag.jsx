import styles from "./CountryFlag.module.css";
import PropTypes from "prop-types";

const BASE_URL = "https://flagcdn.com/";

function CountryFlag({ emojiFlag }) {
  CountryFlag.propTypes = {
    emojiFlag: PropTypes.string.isRequired,
  };

  if (!emojiFlag) return null;

  emojiFlag = emojiFlag.toLowerCase();

  return (
    <img
      className={styles.flag}
      src={`${BASE_URL}${emojiFlag}.svg`}
      alt={`Flag of ${emojiFlag}`}
    />
  );
}

export default CountryFlag;
