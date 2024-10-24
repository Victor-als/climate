/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Clock, Droplet, MapPin } from "lucide-react";
import { WeatherDetails } from "./weatherDetails";
import { useEffect, useState } from "react";
import { getWeatherData } from "../services/api";
import { Footer } from "./footer";

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
        <div className="flex pl-10 w-full flex-col shadow-shape items-start p-10 
         justify-center bg-white bg-clip-padding backdrop-filter backdrop-blur-2xl 
          bg-opacity-10 rounded-3xl text-zinc-400 animate-slide-right">
              <h2 className="flex items-center text-white gap-1 text-xl font-semibold">
                Agora
                </h2>

              <div className="flex items-center gap-16 justify-center">
                <p className="text-5xl md:text-6xl lg:text-7xl flex text-zinc-50 font-bold">
                  {formatTemperature(currentWeather.main.temp)}
                <span className="text-lg">°C</span></p>

                <div className="flex items-center flex-col">
                  <img className="w-20 md:w-24 lg:w-20" 
                    src={getIconUrl(currentWeather.weather[0].icon)} 
                    alt={currentWeather.weather[0].description} 
                  />
        
                  <p className="text-md">{currentWeather.weather[0].description}</p>
                </div>
              </div>

              <hr className="h-px bg-zinc-900 opacity-20 w-full mt-6 mb-2" />

              <div className="flex flex-col gap-2">
                <h2 className="flex items-center justify-center gap-1 text-md">
                    <MapPin size={18}/>
                    {currentWeather.name}
                </h2>
                <p className="text-md flex items-center gap-1"><Droplet size={18}/>
                 {currentWeather.main.humidity}%
                 </p>
               
              </div>
          </div>
      )}

{weatherData && (
  <div className='mt-14 w-full max-w-full'>
    <h2 className="font-bold ml-4 flex items-center gap-4 text-zinc-50 mb-4">
      <CalendarDays size={22} /> 
      Previsão dos próximos 5 dias
    </h2>

    <div className="bg-white bg-clip-padding backdrop-filter backdrop-blur-sm 
         bg-opacity-10 w-full h-auto max-h-[28rem] shadow-shape rounded-3xl 
         text-zinc-50 overflow-auto py-1 animate-slide-up">
      <table className="table-auto w-full text-left text-zinc-50">
        <tbody className="space-y-4">
          {weatherData.list
            .filter((_: any, index: number) => index % 8 === 0)
            .map((day: any, index: number) => (
              <tr key={index}>
                <td className="px-5 py-4 flex items-center">
                  <img 
                    src={getIconUrl(day.weather[0].icon)} 
                    alt={day.weather[0].description} 
                    className="w-10 h-10"
                  />
                  {formatTemperature(day.main.temp)}°C
                </td>
                <td className="px-5 py-4">{formatDate(day.dt)}</td>
                <td className="px-5 py-4 break-words">{day.weather[0].description}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
)}
    </div>


     <div>
            <WeatherDetails currentWeather={currentWeather} />

            {hourlyForecast.length > 0 && (
              <div className="flex flex-col gap-4 w-full">
                <h2 className="font-bold flex items-center gap-6 text-zinc-50">
                  <Clock size={22} />
                  Previsão de 24 horas
                </h2>
                <div className="flex gap-5 2xl:gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden animate-slide-up"> 
                  {hourlyForecast.map((hour, index) => (
                    <div
                      key={index}
                      className="bg-white bg-clip-padding backdrop-filter 
                      backdrop-blur-md  bg-opacity-10 p-4 rounded-xl shadow-shape 
                     text-zinc-50 flex flex-col items-center 2xl:w-[8.2rem] w-full mb-6"
                    >
                      <p className="text-xl font-semibold">
                        {format(new Date(hour.dt * 1000), "HH:mm")}
                      </p>
                      <img
                        src={getIconUrl(hour.weather[0].icon)}
                        alt={hour.weather[0].description}
                        className="2xl:w-20 2xl:h-20"
                      />
                      <p className="text-2xl font-semibold">
                        {formatTemperature(hour.main.temp)}°C 
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Footer />
          </div>

   </div>
  );
};