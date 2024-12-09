/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock } from "lucide-react";

interface HourlyForecastProps {
  hourlyForecast: any[];
  formatTemperature: (temp: number) => number;
  getIconUrl: (iconCode: string) => string;
}

export function HourlyForecast ({hourlyForecast, formatTemperature, getIconUrl}: HourlyForecastProps){
  return (
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
         text-zinc-50 gap-2 flex flex-col items-center 2xl:w-[8.2rem] w-full mb-6"
        >
          <p className="text-xl font-semibold">
           {new Date(hour.dt * 1000).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })} 
          </p>
          <img
            src={getIconUrl(hour.weather[0].icon)}
            alt={hour.weather[0].description}
            className="2xl:w-10 2xl:h-10"
          />
          <p className="text-2xl font-semibold">
            {formatTemperature(hour.main.temp)}°C 
          </p>
        </div>
      ))}
    </div>
  </div>
  )
}