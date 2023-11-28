/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import Button from "./Button";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../context/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import useUrlPosition from "../hooks/useUrlPosition";
function Map() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  const [lat, lng] = useUrlPosition();
  const { cities } = useCitiesContext();

  const [mapPos, setMapPos] = useState([40, 23]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (lat && lng) setMapPos([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPos([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your location"}
        </Button>
      )}
      <MapContainer
        center={mapPos}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <MapCenter pos={mapPos} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function MapCenter({ pos }) {
  const map = useMap();
  map.setView(pos);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
