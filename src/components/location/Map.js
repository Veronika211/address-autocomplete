import { useState, useEffect } from "react";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapComponent = ({ selectedLocation, setSelectedLocation }) => {
  const [viewport, setViewport] = useState({
    latitude: selectedLocation.center[1],
    longitude: selectedLocation.center[0],
    zoom: 17,
  });

  useEffect(() => {
    if (selectedLocation.center[0] === 0 && selectedLocation.center[1] === 0) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setViewport({
          ...viewport,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          zoom: 17,
        });
      });
    }
    setViewport({
      ...viewport,
      latitude: selectedLocation.center[1],
      longitude: selectedLocation.center[0],
      zoom: 17,
    });
  }, [selectedLocation]);

  const handleLocationChange = (e) => {
    setViewport({
      ...viewport,
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
    setSelectedLocation({
      ...selectedLocation,
      center: [e.lngLat.lng, e.lngLat.lat],
    });
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
          <div style={{ width: "30vw", height: "50vh" }}>
            <Map
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              // initialViewState={viewport}
              {...viewport}
              onMove={(evt) => setViewport(evt.viewState)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
