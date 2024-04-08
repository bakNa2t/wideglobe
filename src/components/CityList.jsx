// import { useCities } from "../contexts/CitiesContext";
import { useCitiesLocalStorage } from "../contexts/CitiesLocalStorageContext";

import CityItem from "./CityItem";
import Message from "./Message";
// import Spinner from "./Spinner";

import styles from "./CityList.module.css";

function CityList() {
  // const { cities, isLoading } = useCities();
  const { cities } = useCitiesLocalStorage();

  // if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="No cities found. Add one by clicking on a city on the map." />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
