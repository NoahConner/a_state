export const environment = {
  production: true,
  baseUrl: "https://api.astateinsurance.com/a-state-backend/api",
  /**
   * Google Maps Platform key for the address autocomplete (Homeowners quote → Property address).
   * It is sent to the browser: restrict it to our domains (HTTP referrers) and to
   * "Maps JavaScript API" + "Places API (New)". Empty = autocomplete off, plain text box.
   */
  googleMapsApiKey: "AIzaSyDfU-dgh252_eWbE3Nkn6BU0yV2BlIttvw",
};
