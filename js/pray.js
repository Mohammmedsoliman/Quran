// Use IP-based location detection to get country and city quickly
axios
  .get("https://ipapi.co/json/") // This API gets the user's location by IP
  .then(function(response) {
    // Get city and country from the location data
    const city = response.data.city;
    const country = response.data.country_code;
    document.getElementById('org').innerHTML=city

    // Update params with detected city and country
    let params = {
      country: country,
      city: city,
    };
    // Fetch prayer times using Aladhan API with updated params
    return axios.get("http://api.aladhan.com/v1/timingsByCity", { params: params });
  })
  .then(function(response,cc) {
    // Display prayer times on the page
    fillTime("fajr", response.data.data.timings.Fajr);
    fillTime("duhr", response.data.data.timings.Dhuhr);
    fillTime("Asr", response.data.data.timings.Asr);
    fillTime("Magreb", response.data.data.timings.Maghrib);
    fillTime("isha", response.data.data.timings.Isha);

    // Display Hijri and Gregorian dates
    let dateSentence = response.data.data.date.hijri.weekday.ar + " - " + response.data.data.date.gregorian.date;
    fillTime("day", dateSentence);
    let orgs= response.data.data.meta.method.name
    // Display the calculation method name
    document.getElementById("orgs").innerHTML = orgs;

    console.log(response.data.data.meta.method.name);
    console.log(response.data.data.timings);
  })
  .catch(function(error) {
    console.log("Error fetching prayer times or location:", error);
  });

// Helper function to update elements with times
function fillTime(id, time) {
  document.getElementById(id).innerHTML = time;
}
