/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Droplet, MapPin } from "lucide-react";
import { WeatherDetails } from "./weatherDetails";

interface IWeatherProps {
  weatherData: any;
  currentWeather: any;
}

export function Weather ({currentWeather, weatherData}: IWeatherProps){

  const getIconUrl = (iconCode: string) => `http://openweathermap.org/img/wn/${iconCode}.png`;

  const formatTemperature = (temp: number) => Math.round(temp); // Remove decimais

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'dd MMM', { locale: ptBR });
  };

  return (
    <div className="flex gap-16">
     <div className="flex-col pl-16 items-start flex text-white">
       <div className="absolute w-32 h-16 blur-md top-48 left-[16rem] rounded-full shadow-2xl shadow-blue-800/100 bg-blue-600 bg-blue-"></div>
      {currentWeather && (
        <div className="flex pl-10 w-[23rem] flex-col shadow-shape items-start justify-center 
          p-10 bg-white bg-clip-padding backdrop-filter 
          backdrop-blur-2xl bg-opacity-5 rounded-3xl text-zinc-400">
              <h2 className="flex items-center text-white gap-1 text-xl font-semibold">
                Agora
                </h2>

              <div className="flex items-center gap-16 justify-center">
                <p className="text-7xl flex text-zinc-50 font-bold">{formatTemperature(currentWeather.main.temp)}<span className="text-lg">°C</span></p>
                <img className="w-[5rem]" src={getIconUrl(currentWeather.weather[0].icon)} alt={currentWeather.weather[0].description} />
              </div>

              <div className="flex flex-1 gap-6">
                <h2 className="flex items-center justify-center gap-1 text-md">
                    <MapPin size={18}/>
                    {currentWeather.name}
                </h2>
                <p className="text-md flex items-center gap-1"><Droplet size={18}/>{currentWeather.main.humidity}%</p>
                <p className="text-md">{currentWeather.weather[0].description}</p>
              </div>
          </div>
      )}

      {weatherData && (
        <div className='mt-8'>
          <h2 className="font-bold ml-4 flex items-center gap-4 text-zinc-50 mb-4">
            <CalendarDays size={22}/>
            Previsão dos próximos 5 dias
          </h2>
          <div className="bg-white bg-clip-padding backdrop-filter backdrop-blur-sm 
           bg-opacity-10 w-[23rem] shadow-shape rounded-3xl text-zinc-50 px-4">
            <div className="flex flex-col items-start">
              {weatherData.list.filter((_: any, index: number) => index % 8 === 0).map((day: any, index: number) => (
                <div key={index} className="p-2 w-full rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img src={getIconUrl(day.weather[0].icon)} alt={day.weather[0].description} />
                      <p className="text-md flex">{formatTemperature(day.main.temp)}
                        <span className="text-xs">°C</span>
                      </p>
                    </div>
                      <p className="text-md font-semibold">
                      {formatDate(day.dt)}
                      </p>
                      <p className="text-sm">{day.weather[0].description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        )}
    </div>

      <div>
        <WeatherDetails currentWeather={currentWeather} />
      </div>
   </div>
  );
};