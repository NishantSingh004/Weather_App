const api = {
    key: "5b9095c61ade7781ee867d98f13ce2d9",
    base: "https://api.openweathermap.org/data/2.5/"
}
const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event){
    event.preventDefault(); //this also prevent page from reloading 
    if (event.type =="click"){
         getData(search.value);
         console.log(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => { //we are looking for data from weather api
        return response.json();
    }).then(displayData);
    
}

function displayData (response) {
    console.log(response);
    if(response.cod === "404"){
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city"
        search.value = "";
    } else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;
        
        const today = new Date();
        const date = document.querySelector(".date"); 
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `weather: ${response.weather[0].main}`

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;
        // search.value = " ";
        const weatherIcon = document.querySelector(".weather_icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = " ";
    }
}

function dateFunction (d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturaday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}