// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
// import { useCities } from "../contexts/CitiesContext";
import { useCitiesLocalStorage } from "../contexts/CitiesLocalStorageContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryFlag from "./CountryFlag";
import styles from "./Form.module.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  // const { createCity, isLoading } = useCities();
  const { createCity, getCity, currentCity, updateCity } =
    useCitiesLocalStorage();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const [searchParams] = useSearchParams();
  const isInput = searchParams.get("mode") === "input";
  const isEdit = searchParams.get("mode") === "edit";
  const id = searchParams.get("id");

  if (!isInput && !isEdit) throw new Error("Invalid form mode");

  function resetForm() {
    setCityName("");
    setCountry("");
    setDate(new Date());
    setNotes("");
    setEmoji("");
  }

  useEffect(
    function () {
      if (!isInput) return;
      if (!lat && !lng) return;

      resetForm();

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(data.countryCode);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [isInput, lat, lng]
  );

  useEffect(
    function () {
      if (!isEdit) return;
      if (!id) return;

      getCity(id);

      const { cityName, country, emoji, date, notes } = currentCity;
      setCityName(cityName);
      setCountry(country);
      setDate(date);
      setNotes(notes);
      setEmoji(emoji);
    },
    [isEdit, id, getCity, currentCity]
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    // await createCity(newCity);
    // navigate("/app/cities");

    if (isEdit) {
      updateCity(id, newCity);
    }
    if (isInput) {
      createCity(newCity);
    }

    resetForm();
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message="Click somewhere on the map" />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      /*className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}*/
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles["form-flag"]}>
          <CountryFlag emojiFlag={emoji} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Add notes about {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          rows={4}
        />
      </div>

      <div className={styles.buttons}>
        {isInput ? (
          <Button type="primary">Add</Button>
        ) : (
          <Button type="primary">Update</Button>
        )}
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
