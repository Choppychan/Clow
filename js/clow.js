$( function() {
  $("#cityName").autocomplete({
    data: window.cities,
    limit: 20,
    minLength: 2,
  });
});


function getWeather() {
  var weatherResponse = $('.weatherResponse');
  var weatherMain = $('.weatherMain');
  var weatherDescription = $('.weatherDescription');
  var temp = $('.temp');
  var country = $('.country');
  var temp_max = $('.tempMax');
  var temp_min = $('.tempMin');

  weatherResponse.html('');
  weatherMain.html('');
  weatherDescription.html('');
  temp.html('');
  temp_min.html('');
  temp_max.html('');
  country.html('');


  var cityName = $('#cityName').val();
  var apiCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=20ce837a3f500c892b957257bbc630b8&lang=it';

  $.getJSON(apiCall, weatherCallback);

  function weatherCallback(weatherData) {
    var cityName = weatherData.name;
    var c = weatherData.sys.country;
    var t = parseInt(weatherData.main.temp);
    var t_min = parseInt(weatherData.main.temp_min);
    var t_max = parseInt(weatherData.main.temp_max);
    var weatherd = weatherData.weather[0].description;
    var weather_main = weatherData.weather[0].main;
    if (weather_main.includes("Clouds")) {
      weatherMain.addClass('fas fa-cloud');
    } else if (weather_main.includes("Clear")) {
      weatherMain.addClass('fas fa-sun');
    } else if (weather_main.includes("Snow")) {
      weatherMain.addClass('far fa-snowflake');
    } else if (weather_main.includes("Rain")) {
      weatherMain.addClass('fas fa-cloud-showers-heavy');
    } else if (weather_main.includes("Drizzle")) {
      weatherMain.addClass('fas fa-cloud-rain');
    } else if (weather_main.includes("Thunderstorm")) {
      weatherMain.addClass('fas fa-bolt');
    } else if (weather_main.includes("Smoke") || weather_main.includes("Fog") || weather_main.includes("Mist") || weather_main.includes("Haze") || weather_main.includes("Dust") || weather_main.includes("Sand") || weather_main.includes("Ash") || weather_main.includes("Squall") || weather_main.includes("Tornado")) {
      weatherMain.addClass('fas fa-smog');
    }

    weatherResponse.append(cityName);
    country.append(c);
    temp.append(t);
    temp_max.append(t_max);
    temp_min.append(t_min);
    weatherDescription.append(weatherd.charAt(0).toUpperCase() + weatherd.slice(1));
    weatherMain.append('');
    $('#temp-table').removeClass('hide');
  }

}
