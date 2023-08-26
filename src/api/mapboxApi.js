export async function fetchAddressSuggestions(query) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=ip&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  );
  const data = await response.json();
  return data.features;
}
