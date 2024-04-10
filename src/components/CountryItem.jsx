import CountryFlag from "./CountryFlag";
import styles from "./CountryItem.module.css";

import PropTypes from "prop-types";

function CountryItem({ country }) {
  CountryItem.propTypes = {
    country: PropTypes.object.isRequired,
  };
  return (
    <li className={styles.countryItem}>
      <span className={styles["countryItem-emojiFlag"]}>
        <CountryFlag emojiFlag={country.emoji} />
      </span>
      <span>
        {country.country.length > 15
          ? country.country.slice(0, 15) + "..."
          : country.country}
      </span>
    </li>
  );
}

export default CountryItem;
