/* eslint-disable @typescript-eslint/no-explicit-any */

import { Eye, Thermometer, Waves, Wind } from "lucide-react";

interface IWeatherDetailsProps {
  currentWeather: any;
}
export function WeatherDetails ({currentWeather}: IWeatherDetailsProps) {
  const formatTemperature = (temp: number) => Math.round(temp); 

  return(
    <div className="p-4 shadow-shape w-[60rem] h-[22rem] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 bg-white rounded-3xl text-zinc-300">
      <h2 className="text-zinc-400 font-bold">Detalhes de hoje</h2>

    <div className="flex gap-4 mt-4">
       
      <div className="flex gap-4">
          <div className="bg-zinc-900 flex flex-col justify-center gap-2 rounded-3xl py-6 px-8 h-auto w-auto">
            <p className="text-xs">Sensação Térmica</p>
            <div className="flex gap-10">
              <Thermometer size={32}/>
              <p className="text-lg font-medium">{formatTemperature(currentWeather.main.feels_like)}°C</p>
            </div>
          </div>
          <div className="bg-zinc-900 flex flex-col justify-center gap-2 rounded-3xl py-6 px-8 h-auto w-auto">
            <p className="text-xs">Vento</p>
            <div className="flex gap-10">
              <Wind size={32}/>
              <p className="text-lg font-medium">{currentWeather.wind.speed} m/s</p>
            </div>
          </div>
      </div>

      <div className="flex gap-4">
        <div className="bg-zinc-900 flex flex-col justify-center gap-2 rounded-3xl py-6 px-8 h-auto w-auto">
            <p className="text-xs">Pressão Atmosférica</p>
          <div className="flex gap-10">
            <Waves size={32}/>
            <p className="text-lg font-medium">{currentWeather.main.pressure} hPa</p>
          </div>
        </div>
        <div className="bg-zinc-900 flex flex-col justify-center gap-2 rounded-3xl py-6 px-8 h-auto w-auto">
          <p className="text-xs">Visibilidade</p>
          <div className="flex gap-10">
            <Eye size={32}/>
            <p className="text-lg font-medium">{currentWeather.visibility / 1000} km</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}