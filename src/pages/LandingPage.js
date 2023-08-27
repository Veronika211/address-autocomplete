import { useState } from "react";
import "./LandingPage.css";
import Button from "../components/button/Button";
import InputField from "../components/inputField/InputField";
import MapComponent from "../components/location/Map";
import AddressInput from "../components/location/AddressAutocompleteInput";
import Modal from "../components/modal/Modal";
import { BUTTON_VARIANTS } from "../helpers/constants";

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
  const [formErrors, setFormErrors] = useState({
    addressError: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

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
    setFormErrors({
      address: "",
      addressLine2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    console.log(selectedLocation);
    alert("You have successfully added new address!");
    resetForm();
  };

  const validateForm = () => {
    const requiredFields = ["address", "city", "postcode", "country"];
    const errors = {};

    requiredFields.forEach((field) => {
      if (selectedLocation[field] === "") {
        errors[field] = "This field is required.";
      }
    });

    setFormErrors({ ...errors });

    return Object.keys(errors).length === 0;
  };

  const handleBlurValidation = (name) => {
    if (selectedLocation[name] === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required.",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    if (validateForm()) {
      setModalIsOpen(true);
    }
  };

  return (
    <>
      <h2 className="main-heading">Add New Address</h2>
      <div className="landing-container">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <AddressInput
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                error={formErrors.address}
                onBlur={() => handleBlurValidation("address")}
              />
            </div>
            <InputField
              label="Address Line 2"
              placeholder="Apt / Suite / Bldg / Unit"
              name="addressLine2"
              value={selectedLocation.addressLine2}
              onChange={handleChange}
              parentClassName="address-form"
              error={formErrors.addressLine2}
            />
            <InputField
              label="City"
              placeholder="City"
              name="city"
              value={selectedLocation.city}
              onChange={handleChange}
              onBlur={() => handleBlurValidation("city")}
              parentClassName="address-form"
              error={formErrors.city}
            />
            <div className="address-row">
              <div className="half-width-input">
                <InputField
                  label="State / Province / Region"
                  placeholder="State / Province / Region"
                  name="state"
                  value={selectedLocation.state}
                  onChange={handleChange}
                  error={formErrors.state}
                />
              </div>
              <div className="half-width-input">
                <InputField
                  label="Postcode"
                  placeholder="Postcode"
                  name="postcode"
                  value={selectedLocation.postcode}
                  onChange={handleChange}
                  onBlur={() => handleBlurValidation("postcode")}
                  error={formErrors.postcode}
                />
              </div>
            </div>

            <InputField
              label="Country"
              placeholder="Country"
              name="country"
              value={selectedLocation.country}
              onChange={handleChange}
              parentClassName="address-form"
              onBlur={() => handleBlurValidation("country")}
              error={formErrors.country}
            />
          </form>
          <div>
            <Button
              label="Confirm"
              disabled={false}
              parentClassName="left-button"
              onClick={handleConfirm}
              variant={BUTTON_VARIANTS.FILLED}
            />
            <Button
              label="Reset"
              disabled={Object.keys(selectedLocation).every(
                (key) => key === "center" || selectedLocation[key] === ""
              )}
              onClick={resetForm}
              variant={BUTTON_VARIANTS.FILLED}
            />
          </div>
        </div>

        <MapComponent
          center={selectedLocation.center}
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
