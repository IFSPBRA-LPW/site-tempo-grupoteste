
async function fetchWeather(city) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=pt`,
    )
    if (!response.ok) {
        throw new Error("Erro ao buscar dados da API")
    }
    return response.json()
}

export function adaptWeatherData(data) {
    return {
        city: data.location.name,
        country: data.location.country,
        date: data.location.localtime,

        icon: getWeatherIcon(data.current.condition.text),

        temperature: Math.round(data.current.temp_c),
        feelsLike: Math.round(data.current.feelslike_c),
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        precipitation: data.current.precip_mm,

        daily: data.forecast.forecastday.map(day => ({
            day: formatDay(day.date),
            icon: getWeatherIcon(day.day.condition.text),
            max: Math.round(day.day.maxtemp_c),
            min: Math.round(day.day.mintemp_c),
        })),

        hourly: data.forecast.forecastday[0].hour
            .slice(0, 8)
            .map(hour => ({
                time: formatHour(hour.time),
                temp: Math.round(hour.temp_c),
            })),
    }
}