const today_name = document.getElementById("today_current_name");
const today_current_num = document.getElementById("today_current_num");
const today_current_month = document.getElementById("today_current_month");
const current_temp = document.getElementById("current_temp");
const today_img = document.getElementById("today_img");
const today_condition = document.getElementById("today_condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const wind_direct = document.getElementById("wind_direct");
const location1 = document.getElementById("location");
// next data
const nextDay_name = document.getElementsByClassName("nextDay_name");
const next_temp_max = document.getElementsByClassName("next_temp_max");
const next_temp_min = document.getElementsByClassName("next_temp_min");
const tomorrow_condition =
  document.getElementsByClassName("tomorrow_condition");
const next_img = document.getElementsByClassName("next_img");
// search
const searchInput = document.getElementById("search");
let info = new Date();

async function getData(city = "cairo") {
  const key = "4e8e536e0de444d896b195248241901";
  // 
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3`
  );
  const data = await response.json();

  if (!data.error) {
    display(data);
    displayNextDay(data);
    //getUserLocation();
  }
}

function display(data) {
  location1.textContent = data.location.name;
  current_temp.textContent = data.current.temp_c;
  today_img.setAttribute("src", data.current.condition.icon);
  wind_direct.textContent = data.current.wind_dir;
  today_condition.textContent = data.current.condition.text;
  humidity.textContent = data.current.humidity + "%";
  wind.textContent = data.current.wind_kph + "km/h";
  today_name.textContent = info.toLocaleDateString("en-us", {
    weekday: "long",
  });
  today_current_month.textContent = info.toLocaleDateString("en-us", {
    month: "long",
  });
  today_current_num.textContent = info.toLocaleDateString("en-us", {
    day: "2-digit",
  });
}

searchInput.addEventListener("input", function () {
  getData(searchInput.value);
});

function displayNextDay(data) {
  const next = data.forecast.forecastday;

  for (let i = 0; i < 2; i++) {
    let Day = new Date(next[i + 1].date);

    nextDay_name[i].textContent = Day.toLocaleDateString("en-US", {
      weekday: "long",
    });
    next_temp_max[i].textContent = next[i + 1].day.maxtemp_c;
    next_temp_min[i].textContent = next[i + 1].day.mintemp_c;
    tomorrow_condition[i].textContent = next[i + 1].day.condition.text;
    next_img[i].setAttribute("src", next[i + 1].day.condition.icon);
  }
}

// Uncomment the following lines if you want to include geolocation
let lat, long;

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function successCallback(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  let region = lat + "," + long;
  getData(region);
}

function errorCallback(error) {
  console.error("Error getting geolocation:", error.message);
  // Provide user-friendly message or fallback behavior here
}

// Call getUserLocation to get user's location and fetch weather data
getUserLocation();
// Call getData initially with a default city
getData();
