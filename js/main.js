const API_Key = "6862a3c1342c4717ad0161819242112";
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var searchBar = document.getElementById("locationHolder");
var search = document.getElementById("location");
var newsHolder = document.getElementById("newsLetter");
var news = document.getElementById("newEmail");
var weekDaysHTML = document.querySelectorAll(".weekDay");
var monthDay = document.querySelector(".monthDay");

var firstCardTitle = document.querySelector("#firstCard .card-title");
var firstCardDegree = document.querySelector("#firstCard #degree");
var firstCardImg = document.querySelector("#firstCard .img img");
var firstCardWeatherStatus = document.querySelector("#firstCard .clouds");
var firstCardHumidity = document.querySelector(
  "#firstCard .wind-item:nth-child(1) span"
);
var firstCardWindSpeed = document.querySelector(
  "#firstCard .wind-item:nth-child(2) span"
);
var firstCardWindDirection = document.querySelector(
  "#firstCard .wind-item:nth-child(3) span"
);

var otherCardImgs = document.querySelectorAll(".otherCard .img img");
var otherCardMaxDegrees = document.querySelectorAll(
  ".otherCard span.degree > span"
);
var otherCardMinDegrees = document.querySelectorAll(
  ".otherCard span.degree-small > span"
);
var otherCardWeatherStatuses = document.querySelectorAll(".otherCard .clouds");

searchBar.addEventListener("click", function () {
  search.focus();
});

newsHolder.addEventListener("click", function () {
  news.focus();
});

getLocation();
search.addEventListener("keyup", function () {
  if (search.value.length > 0) {
    fetch(
      `http://api.weatherapi.com/v1/search.json?key=${API_Key}&q=${search.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          var city = data[0].name;
          fetchWeather(city);
        }
      });
  }
});

function fetchWeather(city) {
  var link = `https://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${city}&days=3`;
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      var today = data.forecast.forecastday[0];
      var tomorrow = data.forecast.forecastday[1];
      var afterTomorrow = data.forecast.forecastday[2];

      var dateToday = new Date(today.date);
      var dateTomorrow = new Date(tomorrow.date);
      var dateAfterTomorrow = new Date(afterTomorrow.date);

      firstCardTitle.innerHTML = city;
      firstCardDegree.innerHTML = data.current.temp_c;
      firstCardWeatherStatus.innerHTML = data.current.condition.text;
      firstCardHumidity.innerHTML = data.current.humidity + "%";
      firstCardWindSpeed.innerHTML = data.current.wind_kph + "km/h";
      firstCardImg.src = data.current.condition.icon;

      var windDirection = data.current.wind_dir;
      if (windDirection === "N") {
        firstCardWindDirection.innerHTML = "North";
      } else if (windDirection === "NE") {
        firstCardWindDirection.innerHTML = "North East";
      } else if (windDirection === "E") {
        firstCardWindDirection.innerHTML = "East";
      } else {
        firstCardWindDirection.innerHTML = "Other";
      }

      monthDay.innerHTML =
        dateToday.getDate() + " - " + months[dateToday.getMonth()];

      weekDaysHTML[0].innerHTML = weekDays[dateToday.getDay()];
      weekDaysHTML[1].innerHTML = weekDays[dateTomorrow.getDay()];
      weekDaysHTML[2].innerHTML = weekDays[dateAfterTomorrow.getDay()];

      otherCardImgs[0].src = tomorrow.day.condition.icon;
      otherCardWeatherStatuses[0].innerHTML = tomorrow.day.condition.text;
      otherCardMaxDegrees[0].innerHTML = tomorrow.day.maxtemp_c;
      otherCardMinDegrees[0].innerHTML = tomorrow.day.mintemp_c;

      otherCardImgs[1].src = afterTomorrow.day.condition.icon;
      otherCardWeatherStatuses[1].innerHTML = afterTomorrow.day.condition.text;
      otherCardMaxDegrees[1].innerHTML = afterTomorrow.day.maxtemp_c;
      otherCardMinDegrees[1].innerHTML = afterTomorrow.day.mintemp_c;
    });
}

function getLocation() {
  var link = "http://ip-api.com/json/?fields=city";
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      var city = data.city;
      fetchWeather(city);
    });
}
