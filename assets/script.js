
var cityInputEl = document.querySelector('#search');
var btn = document.querySelector('#btn');
var repoContainerEl = document.querySelector('#repos-container');
var sameDayBody = document.querySelector('#card-body')
var forecastContainer = document.querySelector('#repos-container')



var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCity (city);

        repoContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please evnter valid City name');
    }
};




// needed to run formSubmitHandler
var getCityRepo