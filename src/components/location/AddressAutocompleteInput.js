import React, { useState, useEffect } from "react";
import InputField from "../inputField/InputField";
import "./AddressAutocompleteInput.css";
import { fetchAddressSuggestions } from "../../api/mapboxApi";

const AddressInput = ({
  selectedLocation,
  setSelectedLocation,
  error,
  onBlur,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (selectedLocation.address.trim() === "") {
      setSuggestions([]);
      return;
    }
  }, [selectedLocation.address]);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const suggestions = await fetchAddressSuggestions(
          selectedLocation.address
        );
        setSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
      }
    }

    const debounceTimeout = setTimeout(fetchSuggestions, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [selectedLocation.address]);

  const extractAddressDetails = (objectArray) => {
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
    const autocompleteData = extractAddressDetails(location.context);

    setSelectedLocation({
      ...selectedLocation,
      address: location.place_name,
      city: autocompleteData.city,
      postcode: autocompleteData.postcode,
      country: autocompleteData.country,
      center: location.center,
    });

    setTimeout(() => {
      setSuggestions([]);
    }, 600);
  };

  return (
    <div className="input-container">
      <InputField
        type="text"
        label="Address"
        placeholder="Street Name"
        name="address"
        value={selectedLocation.address}
        onChange={(e) =>
          setSelectedLocation((prevState) => ({
            ...prevState,
            address: e.target.value,
          }))
        }
        onBlur={() => {
          onBlur();
          setTimeout(() => {
            setSuggestions([]);
          }, 600);
        }}
        error={error}
        parentClassName="address-form"
      />

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onMouseDown={() => handleLocationSelect(suggestion)}
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
