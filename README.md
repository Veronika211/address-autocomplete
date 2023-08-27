# Address Autocomplete

Address autocomplete is a feature in which an online form or checkout suggests possible
addresses to users while they type, minimizing typing errors and providing accurate address
data for businesses.

## Installation

### Clone the Repository

1. Open your terminal or command prompt.
2. Change the current working directory to the location where you want the app directory.
3. Run the following command to clone the repository:

```bash
git clone https://github.com/Veronika211/address-autocomplete.git

### **Install Dependencies**

Run the following command to install all neccessary dependencies:
npm install 

### **Set up Environmental Variables**
1. In the root of the app directory, create a .env.local file.
2. Add the following environment variable to the .env.local file:
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoidmVyb25pa2EyMTEiLCJhIjoiY2xsbDI3cnRkMDlpaDNsbmYwcDR2Y3FkaSJ9.dNnVG-7jg1hGQ4vjaV6J9w

### **Start the App**
1. Run the following command to start the app
npm start
2. Open your web browser and navigate to http://localhost:3000.

## **Development**
### **Folder structure**
App.js - the main component
Folders:
- pages/: Contains LandingPage.js for displaying the map and form components.
- helpers/: Contains constants.js for storing app constants.
- api/: Contains mapboxApi.js with functions for communicating with the Mapbox API.
- components/: Consists of multiple folders representing reusable components.

### **Map Integration**
The app integrates map functionality using mapbox-gl and react-map-gl. Data for the Address Field is fetched via the Mapbox Geolocation API.

### **Validation**
For validation of the form a custom validation is created since the validation is simple and there is only one form in the app. In the future, if the app gets bigger or more complex validation is needed i would use react-hook-form or formik. Furthermore, there can be added targeted validation for specific fields, such as postalcodes that are influenced by the chosen country.

If i had more time i would:
 1. Create a snackbar component that will pop up instead of the alert window. The purpose of this snackbar would be to inform the user that data is successfully sent.
 2. Add unit tests for all components



