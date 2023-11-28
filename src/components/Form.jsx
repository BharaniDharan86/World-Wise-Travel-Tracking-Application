// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Spinner from "./Spinner";
import Message from "./Message";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCitiesContext } from "../context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [ErrorCity, setErrorCity] = useState(false);

  const [searchParams] = useSearchParams();
  const { createnewCity } = useCitiesContext();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const url = `https://us1.locationiq.com/v1/reverse?key=pk.1367117fb135247348e126eed5a6d1cc&lat=${lat}&lon=${lng}&format=json`;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoadingCity(true);
        setErrorCity("");
        const res = await fetch(url);
        const data = await res.json();

        if (data.error)
          throw new Error("Thats not a city, click somewhere else");

        const address = data.address;
        setCityName(address.city || address.village || address.town);
        setCountry(data.address.country || "not known");
        setErrorCity("");
      } catch (error) {
        setErrorCity(error.message);
      } finally {
        setIsLoadingCity(false);
      }
    }

    fetchData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji: "❌",
      date,
      notes,
      position: { lat, lng },
    };

    await createnewCity(newCity);

    navigate("/app/city");
  }

  if (isLoadingCity) return <Spinner />;

  if (ErrorCity) return <Message>{ErrorCity}</Message>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/mm/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
