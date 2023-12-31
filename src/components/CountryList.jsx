/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import Message from "./Message";
import { useCitiesContext } from "../context/CitiesContext";
function CountryList() {
  const { cities, loading } = useCitiesContext();
  console.log(loading);
  if (loading) return <Spinner />;

  if (!cities.length)
    return <Message message={"Add your first city by clicking on the map"} />;
  console.log(cities);
  const countries = cities.reduce((arr, city) => {
    if (!Array.isArray(arr)) arr = [];
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  });

  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => {
        return <CountryItem country={country} key={country.id} />;
      })}
    </ul>
  );
}

export default CountryList;
