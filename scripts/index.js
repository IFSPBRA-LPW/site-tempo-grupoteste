import { cityWeather } from "./data.js"
console.log(cityWeather)

function renderBannerInfo(data) {

    const weather_header = document.querySelector(".weather-header")
    const nameCity = weather_header.querySelector("h3")
    const date = document.querySelector(".date")
    const temperature = document.querySelector(".temperature")



    nameCity.textContent = `${data.city} , ${data.country}`
    date.textContent = data.date
    temperature.textContent = `${data.temperature}°`

}


function renderDayInfo(data){
    const weatherCard_Temperature = document.querySelector(".weatherCard_Temperature")
    const weatherCard_Humidity = document.querySelector(".weatherCard_Humidity")
    const weatherCard_Wind = document.querySelector(".weatherCard_Wind")
    const weatherCard_Precipitation = document.querySelector(".weatherCard_Precipitation")

    weatherCard_Temperature.textContent = `${data.feelsLike}°`
    weatherCard_Humidity.textContent = `${data.humidity}%`
    weatherCard_Wind.textContent = `${data.wind}km/h`
    weatherCard_Precipitation.textContent = `${data.precipitation}mm`
}


function renderDaily(dailyData) {
    const dailyContainer = document.querySelector(".daily")
    dailyContainer.innerHTML = ""
    
    dailyData.daily.forEach((day) => {
        const li = document.createElement("li")
        li.className = "dailyCard"
        li.innerHTML = `
            <p class="day-name">${day.day}</p>
            <p class="day-icon">${day.icon}</p>
            <p class="day-max">${day.max}°</p>
            <p class="day-min">${day.min}°</p>
        `
        dailyContainer.appendChild(li)
    })
}

function renderHourly(hourlyData){
    const hourlyContainer = document.querySelector(".hourly")
    hourlyData.hourly.forEach((hour) => {
        const li = document.createElement("li")
        li.className = "hourlyCard"
        li.innerHTML = `
            <p class="hour-time">${hour.time}</p>
            <p class="hour-temp">${hour.temp}°</p>
        `
        hourlyContainer.appendChild(li)
    })

}



function orquestradora(cityWeather){
    renderBannerInfo(cityWeather)
    renderDayInfo(cityWeather)
    renderDaily(cityWeather)
    renderHourly(cityWeather)
}

orquestradora(cityWeather)