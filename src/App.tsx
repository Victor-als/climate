/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Header } from "./components/header"
import { Weather }  from "./components/weather"
import { getWeatherData, getCurrentWeatherData } from './services/api';

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setShowContent(false); 
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
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setShowContent(true); 
      }, 500)
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950">
      <div className="relative z-10 animate-fade-in">
        <Header onSearch={handleSearch} />
        {error && (
          <p className="text-center text-md md:text-lg 2xl:text-2xl font-semibold text-zinc-500 pt-40">
            {error}
          </p>
        )}
        
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500" />
          </div>
        )}

        {!isLoading && showContent && weatherData && currentWeather && (
          <Weather weatherData={weatherData} currentWeather={currentWeather} />
        )}
      </div>

      <div
        className="
          fixed -bottom-96 -left-32 w-[24rem] h-[24rem] rounded-full 
          bg-gradient-to-br from-blue-900 via-blue-700 to-[#00d4ff] 
          blur-[12rem] opacity-55
          shadow-[0_0_80px_30px_#00d4ff,0_0_100px_40px_#00aaff,0_0_150px_50px_#007acc]
          sm:-bottom-80 sm:-left-28 sm:w-[20rem] sm:h-[20rem] sm:blur-[8rem]
          md:-bottom-64 md:-left-20 md:w-[22rem] md:h-[22rem] md:blur-[8rem]
          lg:-bottom-72 lg:-left-16 lg:w-[25rem] lg:h-[25rem] lg:blur-[8rem]
          xl:-bottom-80 xl:-left-12 xl:w-[16rem] xl:h-[16rem] xl:blur-[8rem]
        "
/>

      <div
        className="
          fixed -top-96 -right-24 w-[22rem] h-[22rem] rounded-full 
          bg-gradient-to-br from-blue-900 via-blue-700 to-[#00d4ff] 
          blur-[10rem] opacity-55
          shadow-[0_0_80px_30px_#00d4ff,0_0_100px_40px_#00aaff,0_0_150px_50px_#007acc]
          sm:-top-48 sm:right-8 sm:w-[20rem] sm:h-[18rem] sm:blur-[8rem]
          md:-top-56 md:right-12 md:w-[20rem] md:h-[18rem] md:blur-[8rem]
          lg:-top-72 lg:right-14 lg:w-[20rem] lg:h-[18rem] lg:blur-[8rem]
          xl:-top-72 xl:right-16 xl:w-[20rem] xl:h-[18rem] xl:blur-[8rem]
        "
      />
   </div>
  )
}

export default App
