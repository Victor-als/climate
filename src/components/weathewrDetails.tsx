/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { Eye, Moon, Sun, Thermometer, Waves, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { getAirQualityData } from "../services/api";

interface IWeatherDetailsProps {
  currentWeather: any;

}

const getAirQualityCategory = (aqi: number) => {
  switch (aqi) {
    case 1:
      return "Boa";
    case 2:
      return "Moderada";
    case 3:
      return "Ruim";
    case 4:
      return "Ruim";
    case 5:
      return "Muito ruim";
    default:
      return "Desconhecida";
  }
};
export function WeatherDetails ({currentWeather}: IWeatherDetailsProps) {
  const [airQuality, setAirQuality] = useState<any>(null);


  const formatTemperature = (temp: number) => Math.round(temp); 
  const formatTime = (timestamp: number) => format(new Date(timestamp * 1000), 'HH:mm');


  useEffect(() => {
    const fetchAirQuality = async () => {
      const { coord } = currentWeather;
      if (coord) {
        try {
          const airQualityData = await getAirQualityData(coord.lat, coord.lon);
          setAirQuality(airQualityData);
        } catch (error) {
          console.error('Erro ao buscar dados de qualidade do ar:', error);
        }
      }
    };

    if (currentWeather) {
      fetchAirQuality();
    }
  }, [currentWeather]);

  return( 
    <div className="px-8 py-6 shadow-shape 
    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 bg-sky-400 
    rounded-3xl text-zinc-300">
      
       <h2 className="text-zinc-50 font-bold pt-4">Detalhes de hoje</h2>

    <div className="flex gap-10 mt-6">
      <div>
          <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center 
          gap-2 rounded-3xl py-4 px-6 h-auto w-auto">
            <div className="flex justify-between">
              <p>Qualidade do ar</p>
              {airQuality ? getAirQualityCategory(airQuality.list[0].main.aqi) : 'Carregando...'}
            </div>
             
            <div className="flex gap-5 mt-[1.70rem] items-center">

              <Wind size={48}/>

              <div className="flex flex-col items-center">
                <span className="text-sm text-zinc-400 font-semibold">PM2.5</span>
                <span className="text-3xl font-semibold">
                  {airQuality ? airQuality.list[0].components.pm2_5 : '...'}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm text-zinc-400 font-semibold">SO2</span>
                <span className="text-3xl font-semibold">
                  {airQuality ? airQuality.list[0].components.so2 : '...'}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm text-zinc-400 font-semibold">NO2</span>
                <span className="text-3xl font-semibold">
                  {airQuality ? airQuality.list[0].components.no2 : '...'}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm text-zinc-400 font-semibold">O3</span>
                <span className="text-3xl font-semibold">
                  {airQuality ? airQuality.list[0].components.o3 : '...'}
                </span>
              </div>
            </div>
          </div>


        <div className="flex mt-4 gap-4">
            <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center gap-2 rounded-3xl py-6 px-8 h-auto w-auto">
              <p className="text-xs">Sensação Térmica</p>
              <div className="flex gap-10">
                <Thermometer size={32}/>
                <p className="text-lg font-medium">{formatTemperature(currentWeather.main.feels_like)}°C</p>
              </div>
            </div>
            <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center gap-2 rounded-3xl py-6 px-8 h-auto w-auto">
              <p className="text-xs">Vento</p>
              <div className="flex gap-10">
                <Wind size={32}/>
                <p className="text-lg font-medium">{currentWeather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col">
          <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center gap-2 rounded-3xl py-5 px-6 h-auto w-auto">
           <span className="mb-4">Nascer e Por do sol</span>

           <div className="flex items-center gap-16 justify-start">
             <div>
              <div className="flex gap-3 items-end">
                <Sun size={46}/>
                <div>
                  <p className="text-zinc-400 text-sm">Nascer do sol</p>
                  <span className="text-semibold text-4xl">{formatTime(currentWeather.sys.sunrise)}</span>
                </div>
              </div>
             </div>

             <div>
               <div className="flex gap-3 items-end">
                  <Moon size={46}/>
                  <div >
                    <p className="text-zinc-400 text-sm">Por do sol</p>
                    <span className="text-semibold text-4xl">{formatTime(currentWeather.sys.sunset)}</span>
                  </div>
               </div>
             </div>
              
           </div>

          </div>

      <div className="flex mt-4 gap-4">
          <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center gap-2 rounded-3xl py-6 px-8 h-auto w-auto">
              <p className="text-xs">Pressão Atmosférica</p>
            <div className="flex gap-10">
              <Waves size={32}/>
              <p className="text-lg font-medium">{currentWeather.main.pressure} hPa</p>
            </div>
          </div>
          <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center gap-2 rounded-3xl py-6 px-8 h-auto w-auto">
            <p className="text-xs">Visibilidade</p>
            <div className="flex gap-10">
              <Eye size={32}/>
              <p className="text-lg font-medium">{currentWeather.visibility / 1000} km</p>
            </div>
          </div>
        </div>
    </div>
    </div>

     
  </div>
  )
}