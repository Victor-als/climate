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
    <div className="relative min-h-screen bg-zinc-950">
      {/* Conteúdo principal */}
      <div className="relative z-10">
        <Header onSearch={handleSearch} />
        {error && (
          <p className="text-center text-md md:text-lg 2xl:text-2xl font-semibold text-zinc-500 pt-40">
            {error}
          </p>
        )}
        {weatherData && currentWeather && (
          <Weather weatherData={weatherData} currentWeather={currentWeather} />
        )}
      </div>

      {/* Círculo com blur gradiente no canto superior esquerdo */}
      <div
        className="
          fixed -bottom-96 -left-32 w-[24rem] h-[24rem] rounded-full 
          bg-gradient-to-br from-blue-900 via-blue-700 to-[#00d4ff] 
          blur-[12rem] opacity-70 
          shadow-[0_0_80px_30px_#00d4ff,0_0_100px_40px_#00aaff,0_0_150px_50px_#007acc]
          
          /* Ajustes para telas menores */
          sm:-bottom-80 sm:-left-28 sm:w-[20rem] sm:h-[20rem] sm:blur-[10rem]

          /* Ajustes para tablets */
          md:-bottom-64 md:-left-20 md:w-[22rem] md:h-[22rem] md:blur-[11rem]

          /* Ajustes para desktops */
          lg:-bottom-72 lg:-left-16 lg:w-[25rem] lg:h-[25rem] lg:blur-[12rem]

          /* Ajustes para telas grandes */
          xl:-bottom-80 xl:-left-12 xl:w-[28rem] xl:h-[28rem] xl:blur-[14rem]
        "
/>

      <div
        className="
          fixed -top-96 -right-24 w-[22rem] h-[22rem] rounded-full 
          bg-gradient-to-br from-blue-900 via-blue-700 to-[#00d4ff] 
          blur-[10rem] opacity-90 
          shadow-[0_0_80px_30px_#00d4ff,0_0_100px_40px_#00aaff,0_0_150px_50px_#007acc]

          /* Ajustes para telas menores */
          sm:-top-48 sm:right-8 sm:w-[18rem] sm:h-[18rem] sm:blur-[8rem]

          /* Ajustes para tablets */
          md:-top-56 md:right-12 md:w-[20rem] md:h-[20rem] md:blur-[9rem]

          /* Ajustes para desktops */
          lg:-top-72 lg:right-14 lg:w-[23rem] lg:h-[23rem] lg:blur-[10rem]

          /* Ajustes para telas grandes */
          xl:-top-72 xl:right-16 xl:w-[25rem] xl:h-[25rem] xl:blur-[12rem]
        "
      />
   </div>
  )
}

export default App
