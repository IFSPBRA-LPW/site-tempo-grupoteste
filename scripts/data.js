import { API_KEY } from "./config.js"



document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault()

    const busca = document.querySelector("#busca").value
    fetchWeather(busca)
})

export async function fetchWeather(city) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=pt`
    )

    if (!response.ok) {
        throw new Error("Erro ao buscar dados da API")
    }

    return response.json()
}

export async function getCityWeather(city) {
    const data = await fetchWeather(city)
    return adaptWeatherData(data)
}

export function adaptWeatherData(data) {
    return {
        city: data.location.name,
        country: data.location.country,
        date: data.location.localtime,

        icon: data.current.condition.icon,
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        precipitation: data.current.precip_mm,

        daily: data.forecast.forecastday.map(day => ({
            day: new Date(day.date).toLocaleDateString("pt-BR", { weekday: "short" }),
            icon: day.day.condition.icon,
            max: day.day.maxtemp_c,
            min: day.day.mintemp_c
        })),

        hourly: data.forecast.forecastday.map(day => ({
            hours: day.hour.map(hour => ({
                time: hour.time.split(" ")[1],
                temp: hour.temp_c
            }))
        })),

        raw: data
    }
}
