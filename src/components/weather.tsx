/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Droplet, MapPin } from "lucide-react";
import { WeatherDetails } from "./weathewrDetails";

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
   <div className="flex gap-10">
    <div className="flex-col pl-40 items-start flex min-h-screen text-white">
      {currentWeather && (
        <div className="flex pl-10 flex-col shadow-shape items-start justify-center w-[22rem] h-[14rem] bg-clip-padding backdrop-filter backdrop-blur-sm bg-white bg-opacity-25 rounded-3xl text-zinc-400">
           <h2 className="flex items-center gap-1 text-xl font-semibold">
             Agora
            </h2>

          <div className="flex items-center gap-16 justify-center">
            <p className="text-7xl flex text-zinc-200 font-bold">{formatTemperature(currentWeather.main.temp)}<span className="text-lg">°C</span></p>
            <img className="w-[5rem]" src={getIconUrl(currentWeather.weather[0].icon)} alt={currentWeather.weather[0].description} />
          </div>

          <div className="flex gap-8">
            <h2 className="flex items-center gap-1 text-lg">
                <MapPin size={18}/>
                {currentWeather.name}
            </h2>
            <p className="text-lg flex items-center  gap-1"><Droplet size={18}/>{currentWeather.main.humidity}%</p>
            <p className="text-lg">{currentWeather.weather[0].description}</p>
          </div>
        </div>
      )}

      {weatherData && (
        <div className='mt-8 w-full h-full'>
          <h2 className=" font-bold text-zinc-500 mb-4">Previsão dos próximos 5 dias</h2>
          <div className="bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 px-2 shadow-shape rounded-3xl text-zinc-400 w-[22rem]">
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