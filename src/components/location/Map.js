import { useState, useEffect } from "react";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapComponent = ({ center, setSelectedLocation }) => {
  const [viewport, setViewport] = useState({
    latitude: center[1],
    longitude: center[0],
    zoom: 17,
  });

  useEffect(() => {
    if (center[0] === 0 && center[1] === 0) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setViewport({
          ...viewport,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          zoom: 17,
        });
      });
    } else {
      setViewport({
        ...viewport,
        latitude: center[1],
        longitude: center[0],
        zoom: 17,
      });
    }
  }, [center]);

  const handleLocationChange = (e) => {
    setViewport({
      ...viewport,
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
    setSelectedLocation((prevState) => ({
      ...prevState,
      center: [e.lngLat.lng, e.lngLat.lat],
    }));
  };

  const handleGeoLocationChange = (e) => {
    setViewport({
      ...viewport,
      latitude: e.coords.latitude,
      longitude: e.coords.longitude,
      zoom: 17,
    });
  };

  return (
    <div>
      {viewport.latitude && viewport.longitude && (
        <div>
          <div className="map-container">
            <Map
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              {...viewport}
              onMove={(e) => setViewport(e.viewState)}
              mapStyle="mapbox://styles/mapbox/streets-v12"
            >
              <Marker
                longitude={viewport.longitude}
                latitude={viewport.latitude}
                draggable
                onDragEnd={(e) => handleLocationChange(e)}
              />
              <NavigationControl
                position="bottom-right"
                style={{ zIndex: 20 }}
              />
              <GeolocateControl
                position="top-left"
                trackUserLocation
                onGeolocate={(e) => handleGeoLocationChange(e)}
              />
            </Map>
            {center[0] !== 0 && center[1] !== 0 && (
              <div className="notification-container">
                You can move the pin to adjust the exact location of your
                building!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
