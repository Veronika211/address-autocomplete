import "./LandingPage.css";
import Button from "../components/button/Button";
import InputField from "../components/inputField/InputField";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h2>Add New Address</h2>
      <form>
        <InputField label="Address" placeholder="Street Name" name="address" />
        <InputField
          label="Address Line 2"
          placeholder="Apt / Suite / Bldg / Unit"
          name="addressLine2"
        />
        <InputField label="City" placeholder="City" name="city" />
        <div className="address-row">
          <InputField
            label="State / Province / Region"
            placeholder="State / Province / Region"
            name="state"
            parentClassName="flexbox-input"
          />

          <InputField
            label="Postcode"
            placeholder="Postcode"
            name="postcode"
            parentClassName="flexbox-input"
          />
        </div>
        <InputField label="Country" placeholder="Country" name="country" />
        <Button
          label="Confirm"
          disabled={false}
          type="submit"
          parentClassName="left-button"
        />
        <Button label="Reset" disabled={true} />
      </form>
    </div>
  );
};

export default LandingPage;
