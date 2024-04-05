import { Link } from "react-router-dom";
// import { useCities } from "../contexts/CitiesContext";
import { useCitiesLocalStorage } from "../contexts/CitiesLocalStorageContext";

import CountryFlag from "./CountryFlag";
import PropTypes from "prop-types";

import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  CityItem.propTypes = {
    city: PropTypes.object.isRequired,
  };

  // const { currentCity, deleteCity } = useCities();
  const { currentCity, deleteCity } = useCitiesLocalStorage();
  const { cityName, emoji, date, id, position } = city;

  /*function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }*/
  async function handleClick(e) {
    e.preventDefault();
    await deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* <span className={styles.emoji}>{emoji}</span> */}
        <span className={styles.emoji}>
          <CountryFlag emojiFlag={emoji} />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
