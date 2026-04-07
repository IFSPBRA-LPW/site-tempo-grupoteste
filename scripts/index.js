import { getCityWeather } from "./data.js"

let currentWeatherData = null
let selectedDayIndex = 0

function renderBannerInfo(data) {
    const weather_header = document.querySelector(".weather-header")
    const nameCity = weather_header.querySelector("h3")
    const date = document.querySelector(".date")
    const temperature = document.querySelector(".temperature")

    nameCity.textContent = `${data.city}, ${data.country}`
    date.textContent = data.date
    temperature.textContent = `${data.temperature}°`
}

function renderDayInfo(data) {
    document.querySelector(".weatherCard_Temperature").textContent = `${data.feelsLike}°`
    document.querySelector(".weatherCard_Humidity").textContent = `${data.humidity}%`
    document.querySelector(".weatherCard_Wind").textContent = `${data.wind}km/h`
    document.querySelector(".weatherCard_Precipitation").textContent = `${data.precipitation}mm`
}

function renderDaily(data) {
    const dailyContainer = document.querySelector(".daily")
    dailyContainer.innerHTML = ""

    data.daily.forEach((day, index) => {
        const li = document.createElement("li")
        li.className = "dailyCard"
        li.innerHTML = `
            <p>${day.day}</p>
            <img src="https:${day.icon}">
            <p>${day.max}°</p>
            <p>${day.min}°</p>
        `

        li.addEventListener("click", () => {
            selectedDayIndex = index
            updateDayButton()
            renderHourly(currentWeatherData, selectedDayIndex)
        })

        dailyContainer.appendChild(li)
    })
}

function renderHourly(data, dayIndex) {
    const hourlyContainer = document.querySelector(".hourly ul")
    hourlyContainer.innerHTML = ""

    const hours = data.hourly[dayIndex].hours

    hours.forEach((hour) => {
        const li = document.createElement("li")
        li.className = "hourlyCard"
        li.innerHTML = `
            <p>${hour.time}</p>
            <p>${hour.temp}°</p>
        `
        hourlyContainer.appendChild(li)
    })
}

function updateDayButton() {
    const date = currentWeatherData.raw.forecast.forecastday[selectedDayIndex].date

    const dayName = new Date(date).toLocaleDateString("pt-BR", {
        weekday: "long"
    })

    document.querySelector("#changeDay").textContent = dayName
}

function orquestradora(data) {
    currentWeatherData = data
    selectedDayIndex = 0

    renderBannerInfo(data)
    renderDayInfo(data)
    renderDaily(data)
    renderHourly(data, 0)
    updateDayButton()
}

document.querySelector("#changeDay").addEventListener("click", () => {
    if (!currentWeatherData) return

    selectedDayIndex = (selectedDayIndex + 1) % 7

    updateDayButton()
    renderHourly(currentWeatherData, selectedDayIndex)
})

document.querySelector(".search").addEventListener("submit", async (e) => {
    e.preventDefault()

    const city = document.querySelector("#busca").value

    try {
        const data = await getCityWeather(city)
        orquestradora(data)
        document.querySelector("#busca").value = ""
    } catch {
        alert("Cidade não encontrada!")
    }
})

const themeBtn = document.querySelector("#themeToggle")

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light")
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light")

    const isLight = document.body.classList.contains("light")
    localStorage.setItem("theme", isLight ? "light" : "dark")
})

getCityWeather("São Paulo")
    .then(data => orquestradora(data))
    .catch(() => alert("Erro ao carregar dados iniciais"))
getCityWeather("São Paulo").then(data => orquestradora(data)).catch(() => alert("Erro ao carregar dados iniciais"))
