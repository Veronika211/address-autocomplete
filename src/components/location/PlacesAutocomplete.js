import React, { useState, useEffect } from "react";
import InputField from "../inputField/InputField";
import "./PlacesAutocomplete.css";

const AddressInput = ({ selectedLocation, setSelectedLocation }) => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (address.trim() === "") {
      setSuggestions([]);
      return;
    }
    async function fetchAddressSuggestions(query) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=ip&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      );
      const data = await response.json();
      setSuggestions(data.features);
    }

    fetchAddressSuggestions(address);
  }, [address]);

  const transformObject = (objectArray) => {
    const newObject = {
      postcode: "",
      country: "",
      city: "",
    };
    for (let i = 0; i < objectArray.length; i++) {
      if (objectArray[i].id.includes("postcode")) {
        newObject.postcode = objectArray[i].text;
      }
      if (objectArray[i].id.includes("place")) {
        newObject.city = objectArray[i].text;
      }
      if (objectArray[i].id.includes("country")) {
        newObject.country = objectArray[i].text;
      }
    }
    return newObject;
  };

  const handleLocationSelect = (location) => {
    const autocompleteData = transformObject(location.context);
    setAddress(location.place_name);
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
    setSelectedLocation({
      ...selectedLocation,
      address: location.place_name,
      city: autocompleteData.city,
      postcode: autocompleteData.postcode,
      country: autocompleteData.country,
      center: location.center,
    });
  };

  return (
    <div className="input-container">
      <InputField
        type="text"
        label="Address"
        placeholder="Street Name"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleLocationSelect(suggestion)}
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressInput;
