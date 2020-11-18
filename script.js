const api = {
    key: "aafaa1640d271c01158c9f9631479ad6", 
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if (evt.keyCode == 13){
        getResults(searchBox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }) .then(displayResults);

}

function displayResults (weather) {
    let city = document.querySelector('.location .city'); 
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temp = document.querySelector('.temp'); 
    temp.innerText = `${weather.main.temp}°c`;
    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

}

function dateBuilder(d) {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
        ];
    let days = 
        ["Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${month} ${date}, ${year}`;
}