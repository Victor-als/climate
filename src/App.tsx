/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Header } from "./components/header"
import { Weather }  from "./components/weather"
import { getWeatherData, getCurrentWeatherData } from './services/api';

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    try {
      const currentData = await getCurrentWeatherData(city);
      const forecastData = await getWeatherData(city);
      setCurrentWeather(currentData);
      setWeatherData(forecastData);
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Cidade não encontrada ou erro ao buscar o clima.');
      setWeatherData(null);
      setCurrentWeather(null);
    }
  };

  return (
    <>
     <Header onSearch={handleSearch}/>
     {error && <p className="text-center mr-20 text-xl font-semibold text-zinc-500 mt-20 ">{error}</p>}
     {weatherData && currentWeather && <Weather weatherData={weatherData} currentWeather={currentWeather} />}
    </>
  )
}

export default App
