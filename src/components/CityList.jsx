/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import Message from "./Message";
import { useCitiesContext } from "../context/CitiesContext";
function CityList() {
  const { cities, loading } = useCitiesContext();
  if (loading) return <Spinner />;

  if (cities.length === 0)
    return <Message>Add your first city by clicking on the map</Message>;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}

export default CityList;
