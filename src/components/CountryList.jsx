import { useCitiesLocalStorage } from "../contexts/CitiesLocalStorageContext";
// import { useCities } from "../contexts/CitiesContext";

import CountryItem from "./CountryItem";
import Message from "./Message";
// import Spinner from "./Spinner";

import styles from "./CountryList.module.css";

function CountryList() {
  // const { cities, isLoading } = useCities();
  const { cities } = useCitiesLocalStorage();

  // if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="No countries found. Add one by clicking on a city on the map." />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
