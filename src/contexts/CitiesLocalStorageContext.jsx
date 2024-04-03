import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import PropTypes from "prop-types";

const CitiesLocalStorageContext = createContext();

function CitiesLocalStorageProvider({ children }) {
  CitiesLocalStorageProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [cities, setCities] = useLocalStorage([], "cities");
  const [currentCity, setCurrentCity] = useState({});

  function getCity(id) {
    setCurrentCity(cities.find((city) => city.id === id));
  }

  function createCity(newCity) {
    newCity.id = crypto.randomUUID();
    setCurrentCity(newCity);
    setCities((city) => [...city, newCity]);
  }

  function deleteCity(id) {
    setCities((city) => city.filter((city) => city.id !== id));
  }

  function editCity(id, editedCity) {
    setCities((city) =>
      city.map((cityItem) => {
        if (cityItem.id === id) {
          return { ...cityItem, ...editedCity };
        }
        return cityItem;
      })
    );
  }

  return (
    <CitiesLocalStorageContext.Provider
      value={{ cities, currentCity, getCity, createCity, deleteCity, editCity }}
    >
      {children}
    </CitiesLocalStorageContext.Provider>
  );
}

function useCitiesLocalStorage() {
  const context = useContext(CitiesLocalStorageContext);
  if (context === undefined) {
    throw new Error(
      "CitiesLocalStorageContext was used outside the CitiesLocalStorageProvider"
    );
  }
  return context;
}

export { CitiesLocalStorageProvider, useCitiesLocalStorage };
