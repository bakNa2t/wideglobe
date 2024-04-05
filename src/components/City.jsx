import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useCities } from "../contexts/CitiesContext";
import { useCitiesLocalStorage } from "../contexts/CitiesLocalStorageContext";
import { useUrlPosition } from "../hooks/useUrlPosition";

// import Spinner from "./Spinner";
import BackButton from "./BackButton";
import CountryFlag from "./CountryFlag";

import styles from "./City.module.css";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  // const { getCity, currentCity, isLoading } = useCities();
  const { getCity, currentCity } = useCitiesLocalStorage();

  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;

  // if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>
            <CountryFlag emojiFlag={emoji} />
          </span>
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Read about {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div className={styles.buttons}>
        <BackButton />
        <Button
          type="primary"
          onClick={() =>
            navigate(`/app/form?mode=edit&id=${id}&lat=${lat}&lng=${lng}`)
          }
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

export default City;
