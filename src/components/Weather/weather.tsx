/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { WeatherDetails } from "../WeatherDetails/weatherDetails";
import { useEffect, useState } from "react";
import { getWeatherData } from "../../services/api";
import { Footer } from "../footer/footer";
import { DailyForecast } from "./DailyForecast";
import { HourlyForecast } from "./hourlyForecast";
import { WeatherCard } from "./weatherCard";

interface IWeatherProps {
  weatherData: any;
  currentWeather: any;
}

export function Weather ({currentWeather, weatherData}: IWeatherProps){
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([])

  const getIconUrl = (iconCode: string) => `http://openweathermap.org/img/wn/${iconCode}.png`;
  const formatTemperature = (temp: number) => Math.round(temp); 
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'dd MMM', { locale: ptBR });
  };

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        if (currentWeather?.name) {
          const data = await getWeatherData(currentWeather.name);
          if (data && data.list) {
            setHourlyForecast(data.list.slice(0, 8)); 
          }
        }
      } catch (error) {
        console.error("Erro ao buscar a previsão horária:", error);
      }
    };

    fetchHourlyForecast();
  }, [currentWeather]);

  return (
    <div className="flex flex-col lg:flex-row gap-12 2xl:gap-16 mx-8 2xl:mx-0 2xl:ml-12 pb-16 pt-36">
     <div className="flex flex-col text-white">
     
      {currentWeather && (
        <WeatherCard 
          currentWeather={currentWeather}
          formatTemperature={formatTemperature}
          getIconUrl={getIconUrl}
        />
      )}

      {weatherData && (
        <DailyForecast 
         weatherData={weatherData}
         formatTemperature={formatTemperature}
         formatDate={formatDate}
         getIconUrl={getIconUrl}
        />
      )}
    </div>

     <div>
            <WeatherDetails currentWeather={currentWeather} />
            {hourlyForecast.length > 0 && (
              <HourlyForecast 
                hourlyForecast={hourlyForecast} 
                formatTemperature={formatTemperature} 
                getIconUrl={getIconUrl} 
              />
            )}
            <Footer />
          </div>
   </div>
  );
};