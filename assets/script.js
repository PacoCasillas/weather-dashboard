// data-current-temp
// data-current-wind
// data-current-humidity

// https://openweathermap.org/img/wn/{var from api call}.png

var APIkey = '87344b687790367aea2d6f5bc2c86aa7';

var dayCardContainer = document.querySelector('#card-container');
var cityInput = document.querySelector('#search');
var searchButton = document.querySelector('.btn');



function getLatAndLon (city) {

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${APIkey}`)
    .then(function(response){
    return response.json()

}).then(function(data) {
    // console.log(data)
    // console.log(data[0].lat)
    // console.log(data[0].lon)

    var lat = data[0].lat;
    var lon = data[0].lon;

    getInfo(lat, lon);
})

};


function getInfo (lat, lon) {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&per_page=5`)
    
    .then(function(response) {
        return response.json() 

    

}).then(function(data) {
    // console.log(data)
    // console.log(data.list[0].dt_txt.split(" ")[0])
    // console.log(data.city.name)

    // console.log(data.list[0].weather[0].icon)

    // console.log(data.list[0].main.temp + " Celcius")
    // console.log(data.list[0].wind.speed +" MPS")
    // console.log(data.list[0].main.humidity +" %")

    cardForecast(data);
    currentForecast(data);
    // var weatherIcon = data.list[0].weather.icon ;
    // var date = data.list[o].dt_txt.split(" ")[0];
    // var temperature = data.list[0].main.temp + " Celcius" ;
    // var windSpeed = data.list[0].wind.speed +" MPS";
    // var humidity = data.list[0].main.humidity +" %";
})
};

function cardForecast (data) {
    for (var i=0; i < data.list.length; i++ ) {
    if (data.list[i].dt_txt.split(' ')[1] == '12:00:00' ) {

        console.log('hello world');

    var weatherIcon = data.list[i].weather[0].icon;
    var date = data.list[i].dt_txt.split(" ")[0];
    var temperature = data.list[i].main.temp + "° C" ;
    var windSpeed = data.list[i].wind.speed +" M/S";
    var humidity = data.list[i].main.humidity +" %";

    var cardContainer = document.createElement('div');
    cardContainer.classList.add('col', 'day-card');
    dayCardContainer.appendChild(cardContainer);

    var forecastDetailContainer = document.createElement('div');
    forecastDetailContainer.classList.add('row');
    cardContainer.appendChild(forecastDetailContainer);

    var cardImage = document.createElement('img');
    cardImage.setAttribute('src', `https://openweathermap.org/img/wn/${weatherIcon}.png`);
    cardImage.setAttribute('alt', 'weather icon');
    cardImage.classList.add('day-icons');
    forecastDetailContainer.appendChild(cardImage);

    var dateElement = document.createElement('div');
    dateElement.classList.add('col-12');
    dateElement.textContent = date;
    forecastDetailContainer.appendChild(dateElement);

    var temperatureElement = document.createElement('div');
    temperatureElement.classList.add('col-4');
    temperatureElement.textContent = temperature;
    forecastDetailContainer.appendChild(temperatureElement);

    var windElement = document.createElement('div');
    windElement.classList.add('col-4');
    windElement.textContent = windSpeed;
    forecastDetailContainer.appendChild(windElement);

    var humidityElement = document.createElement('div');
    humidityElement.classList.add('col-4');
    humidityElement.textContent = humidity;
    forecastDetailContainer.appendChild(humidityElement);
    } }

    // dayCardContainer.appendChild(forecastDetailContainer);
}

function currentForecast (data) {
    var weatherIcon = data.list[0].weather[0].icon;
    var date = data.list[0].dt_txt.split(" ")[0];
    var temperature = data.list[0].main.temp + "°C" ;
    var windSpeed = data.list[0].wind.speed +" m/s";
    var humidity = data.list[0].main.humidity +" %";
    var currentCity = data.city.name;

    document.querySelector('#current-icon').setAttribute('src', `https://openweathermap.org/img/wn/${weatherIcon}.png`);
    document.querySelector('#current-icon').setAttribute('alt', 'weather icon');
    document.querySelector('#current-temp').textContent = temperature;
    document.querySelector('#current-city').textContent = currentCity;
    document.querySelector('#current-date').textContent = date;
    document.querySelector('#current-wind').textContent = windSpeed;
    document.querySelector('#current-humidity').textContent = humidity;

}

searchButton.addEventListener('click', function(event){
    event.preventDefault();
    var city = cityInput.value;
    getLatAndLon(city);
});

// create search > create local storage > call function to base off of the last search

// cityInput.addEventListener('submit', getLatAndLon);


// lon: -79.4163, lat: 43.7001