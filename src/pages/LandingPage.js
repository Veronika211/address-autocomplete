import { useState } from "react";
import "./LandingPage.css";
import Button from "../components/button/Button";
import InputField from "../components/inputField/InputField";
import MapComponent from "../components/location/Map";
import AddressInput from "../components/location/PlacesAutocomplete";
import Modal from "../components/modal/Modal";
// import PlacesAutocompleteComponent from "../components/location/PlacesAutocomplete";

const LandingPage = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    center: [0, 0],
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const resetForm = () => {
    setSelectedLocation({
      address: "",
      addressLine2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      center: [0, 0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedLocation);
  };

  return (
    <>
      <div className="landing-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Add New Address</h2>
          <div>
            <AddressInput
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
          <InputField
            label="Address Line 2"
            placeholder="Apt / Suite / Bldg / Unit"
            name="addressLine2"
            value={selectedLocation.addressLine2}
          />
          <InputField
            label="City"
            placeholder="City"
            name="city"
            value={selectedLocation.city}
          />
          <div className="address-row">
            <InputField
              label="State / Province / Region"
              placeholder="State / Province / Region"
              name="state"
              parentClassName="flexbox-input"
              value={selectedLocation.state}
            />

            <InputField
              label="Postcode"
              placeholder="Postcode"
              name="postcode"
              parentClassName="flexbox-input"
              value={selectedLocation.postcode}
            />
          </div>
          <InputField
            label="Country"
            placeholder="Country"
            name="country"
            value={selectedLocation.country}
          />
          <Button
            label="Confirm"
            disabled={false}
            parentClassName="left-button"
            onClick={() => setModalIsOpen(true)}
          />
          <Button label="Reset" disabled={true} onClick={resetForm} />
        </form>
        <MapComponent
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
      {modalIsOpen && (
        <Modal
          setIsOpen={setModalIsOpen}
          modalTitle="Is this the address you want to submit?"
          modalDetails={
            <div>
              <p>Address: {selectedLocation.address}</p>
              <p>Address Line 2: {selectedLocation.addressLine2}</p>
              <p>City: {selectedLocation.city}</p>
              <p>State: {selectedLocation.state}</p>
              <p>Postcode: {selectedLocation.postcode}</p>
              <p>Country: {selectedLocation.country}</p>
            </div>
          }
          submitFunction={handleSubmit}
        />
      )}
    </>
  );
};

export default LandingPage;
