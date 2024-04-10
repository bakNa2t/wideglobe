import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useCities } from "../contexts/CitiesContext";
import { useCitiesLocalStorage } from "../contexts/CitiesLocalStorageContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";

import styles from "./Map.module.css";

import Button from "./Button";
import CountryFlag from "./CountryFlag";
import Sidebar from "./Sidebar";

import PropTypes from "prop-types";

function Map() {
  const [mapPos, setMapPos] = useState([59.326, 18.073]);
  // const { cities } = useCities();
  const { cities } = useCitiesLocalStorage();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPos([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPos([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={styles.mapContainer} /*onClick={() => navigate("form")}*/>
        {!geolocationPosition && (
          <Button type="position" onClick={getPosition}>
            {isLoadingPosition ? "Loading..." : "Use your position"}
          </Button>
        )}
        <MapContainer
          center={mapPos}
          zoom={10}
          zoomControl={false}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          {cities.map((city) => {
            return (
              <Marker
                position={[city.position.lat, city.position.lng]}
                key={city.id}
              >
                <Popup>
                  <span>
                    <CountryFlag emojiFlag={city.emoji} />
                  </span>
                  <span>{city.cityName}</span>
                </Popup>
              </Marker>
            );
          })}
          <ChangeCenterPos position={mapPos} />
          <DetectClick />
          <ToggleSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </MapContainer>
      </div>
    </>
  );
}

function ChangeCenterPos({ position }) {
  ChangeCenterPos.propTypes = {
    position: PropTypes.any.isRequired,
  };

  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?mode=input&lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

function ToggleSidebar({ setIsSidebarOpen }) {
  ToggleSidebar.propTypes = {
    // isSidebarOpen: PropTypes.bool.isRequired,
    setIsSidebarOpen: PropTypes.func.isRequired,
  };

  const handleClick = () => setIsSidebarOpen(true);

  useMapEvents({
    click: handleClick,
  });
  return null;
}

export default Map;
