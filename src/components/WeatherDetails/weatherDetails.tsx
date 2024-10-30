/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  getAirQualityCategory,
  getWindDirection,
  getMoonPhase,
  formatTemperature,
  formatTime,
} from "../WeatherDetails/utils/utils";
import { getAirQualityData, getWeatherData, getUVIndex } from "../../services/api";
import { Wind, Moon, Sunrise, Sunset, Thermometer, CloudRain, Eye, Waves, Compass, Sun } from "lucide-react";

interface IWeatherDetailsProps {
  currentWeather: any;
}

export function WeatherDetails({ currentWeather }: IWeatherDetailsProps) {
  const [airQuality, setAirQuality] = useState<any>(null);
  const [rainProbability, setRainProbability] = useState<number | null>(null);
  const [uvIndex, setUVIndex] = useState<number | null>(null);
  const [moonPhase, setMoonPhase] = useState<string | null>(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      const { coord } = currentWeather;
      if (coord) {
        try {
          const airQualityData = await getAirQualityData(coord.lat, coord.lon);
          setAirQuality(airQualityData);
        } catch (error) {
          console.error("Erro ao buscar dados de qualidade do ar:", error);
        }
      }
    };

    const fetchRainProbability = async () => {
      try {
        const weatherData = await getWeatherData(currentWeather.name);
        setRainProbability(weatherData.rainProbability);
      } catch (error) {
        console.error("Erro ao buscar a probabilidade de chuva:", error);
      }
    };

    const fetchUVIndex = async () => {
      const { coord } = currentWeather;
      if (coord) {
        try {
          const uvData = await getUVIndex(coord.lat, coord.lon);
          setUVIndex(uvData.value);
        } catch (error) {
          console.error("Erro ao buscar o índice UV:", error);
        }
      }
    };

    if (currentWeather) {
      fetchAirQuality();
      fetchRainProbability();
      fetchUVIndex();
      setMoonPhase(getMoonPhase(new Date()));
    }
  }, [currentWeather]);

  const airQualityInfo = airQuality
    ? getAirQualityCategory(airQuality.list[0].main.aqi)
    : { label: "Carregando...", className: "" };

  const windDirection = getWindDirection(currentWeather.wind.deg);
  return( 
    <div className="shadow-shape bg-clip-padding backdrop-filter backdrop-blur-sm 
    bg-opacity-10 bg-white rounded-3xl text-zinc-300 w-full max-w-[150rem] 
    flex flex-col items-center lg:items-start px-4 lg:px-5 pb-6 mb-6 mt-10 md:mt-0 2xl:mt-0 
    2xl:px-10 animate-slide-left">
      
       <h2 className="text-zinc-50 font-bold pt-4">Detalhes de hoje</h2>

    <div className="flex lg:flex-col 2xl:flex-row xl:w-full lg:w-full 2xl:items-center 
     flex-col gap-10 mt-6">
      <div>
          <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center 
           gap-2 rounded-3xl py-4 px-6 h-auto 2xl:w-full lg:w-full md:w-full xl:w-full 
           sm:w-full">
            <div className="flex justify-between">
              <p className="font-medium">Qualidade do ar</p>
              <p className={airQualityInfo.className}>
                {airQualityInfo.label}
              </p>
            </div>
             
            <div className="flex gap-8 mt-[1.70rem] items-center">
              <Wind size={32}/>
              <div className="flex flex-wrap lg:flex-nowrap gap-3 2xl:gap-8">
              <div className="flex flex-row-reverse lg:flex-col 2xl:flex-col gap-2 items-center">
                <span className="text-sm text-zinc-400 font-semibold">PM2.5</span>
                <span className="text-xl 2xl:text-3xl lg:text-2xl font-semibold">
                  {airQuality ? airQuality.list[0].components.pm2_5 : '...'}
                </span>
              </div>
 
              <div className="flex flex-row-reverse lg:flex-col 2xl:flex-col gap-2 items-center">
                <span className="text-sm text-zinc-400 font-semibold">SO2</span>
                <span className="text-xl 2xl:text-3xl lg:text-2xl font-semibold">
                  {airQuality ? airQuality.list[0].components.so2 : '...'}
                </span>
              </div>

              <div className="flex flex-row-reverse lg:flex-col 2xl:flex-col gap-2 items-center">
                <span className="text-sm text-zinc-400 font-semibold">NO2</span>
                <span className="text-xl 2xl:text-3xl lg:text-2xl font-semibold">
                  {airQuality ? airQuality.list[0].components.no2 : '...'}
                </span>
              </div>

              <div className="flex flex-row-reverse lg:flex-col 2xl:flex-col gap-2 items-center">
                <span className="text-sm text-zinc-400 font-semibold">O3</span>
                <span className="text-xl 2xl:text-3xl lg:text-2xl font-semibold">
                  {airQuality ? airQuality.list[0].components.o3 : '...'}
                </span>
              </div>
            </div>
          </div>

          </div>


        <div className="flex flex-col lg:flex-row 2xl:flex-row mt-4 gap-4 w-full">
            <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center
             gap-4 rounded-3xl py-6 px-8 w-full">
              <p className="text-md font-semibold">Sensação Térmica</p>
              <div className="flex justify-between gap-10">
                <Thermometer size={42}/>
                <p className="text-3xl font-medium">
                   {formatTemperature(currentWeather.main.feels_like)}°C
                </p>
              </div>
            </div>
            <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center 
             gap-4 rounded-3xl xl:w-full py-6 px-8 h-auto w-full">
              <p className="text-md font-semibold">Vento</p>
              <div className="flex justify-between gap-10">
                <Wind size={38} />
                <p className="text-3xl font-medium">{currentWeather.wind.speed} 
                  m/s
                </p>
              </div>
            </div>
          </div>
            <div className="flex flex-col lg:flex-row 2xl:flex-row mt-4 gap-4">
              <div 
               className="bg-zinc-900 bg-opacity-50 flex flex-col gap-4 py-6 
               px-8  xl:w-full justify-center rounded-3xl xl:full 2xl:w-[17.6rem] h-auto w-full"
              >
                <p className="text-md font-semibold">Índice UV</p>
                <div className="flex justify-between gap-10">
                  <Sun size={42}/>
                  <p className="text-3xl font-medium">
                    {uvIndex !== null ? uvIndex : 'Carregando...'}
                  </p>
                </div>
              </div>

                <div className="bg-zinc-900 bg-opacity-50 flex flex-col gap-4
                 justify-center rounded-3xl py-6 px-8 2xl:w-[17.6rem] h-auto 
                 w-full xl:w-full">
                  <p className="text-md font-semibold">Direção do vento</p>
                  <div className="flex justify-between gap-10">
                    <Compass size={38} />
                    <div className="text-3xl font-medium">
                      <p>{windDirection}</p> 
                    </div>
                  </div>
                </div>
            </div>
        </div>


        <div className="flex flex-col gap-4 w-full ">
          <div className="bg-zinc-900 bg-opacity-50 flex flex-col gap-2 
          rounded-3xl py-5 px-6 h-auto 2xl:w-full lg:w-full xl:w-full w-full">
           <span className="mb-4 font-medium">Nascer e Por do sol</span>

           <div className="flex md:justify-between items-start gap-32 justify-start">
             <div>
              <div className="flex flex-col lg:flex-row lg:items-center 2xl:flex-row 
               2xl:items-center gap-6 ">
                <Sunrise size={32}/>
                <div>
                  <p className="text-zinc-400 text-sm font-semibold">Nascer do sol</p>
                  <span className="text-semibold text-4xl">
                    {formatTime(currentWeather.sys.sunrise)}
                  </span>
                </div>
              </div>
             </div>

             <div>
               <div className="flex flex-col lg:items-center lg:flex-row 2xl:flex-row 
                2xl:items-center gap-6">
                  <Sunset size={32}/>
                  <div >
                    <p className="text-zinc-400 text-sm font-semibold">Por do sol</p>
                    <span className="text-semibold text-4xl">
                      {formatTime(currentWeather.sys.sunset)}
                    </span>
                  </div>
               </div>
             </div>
           </div>
          </div>

      <div className="flex flex-col lg:flex-row 2xl:flex-row gap-4">
          <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center 
            gap-4 rounded-3xl py-6 px-8 2xl:w-[17.6rem] xl:w-full h-auto w-full">
              <p className="text-md font-semibold">Pressão Atmosférica</p>
            <div className="flex justify-between items-center gap-10">
              <Waves size={38}/>
              <p className="text-3xl font-medium">{currentWeather.main.pressure} hPa</p>
            </div>
          </div>
          <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center gap-4 rounded-3xl py-6 px-8 
             2xl:w-[17.6rem] xl:w-full h-auto w-full">
            <p className="text-md font-semibold">Visibilidade</p>
            <div className="flex justify-between items-center gap-10">
              <Eye size={42}/>
              <p className="text-3xl font-medium">{currentWeather.visibility / 1000} km</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row 2xl:flex-row gap-4">
           <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center gap-4 rounded-3xl py-6 px-8 
             2xl:w-[17.6rem] xl:w-full h-auto w-full">
              <p className="text-md font-semibold">Probabilidade de Chuva</p>
                <div className="flex justify-between items-center gap-10">
                  <CloudRain size={42} />
                  <p className="text-3xl flex items-center gap-6 font-medium">
                    {rainProbability !== null ? `${Math.round(rainProbability * 100)}%` : 'Carregando...'}
                  </p> 
                </div>
            </div> 

            <div className="bg-zinc-900 bg-opacity-50 flex flex-col justify-center gap-4 rounded-3xl py-6 px-8
              2xl:w-[17.6rem] xl:w-full h-auto w-full">
                <p className="text-md font-semibold">Fase da Lua</p> 
                <div className="flex justify-between gap-10 items-center">
                  <Moon size={38}/>
                  <p className="text-xl font-medium">{moonPhase}</p>
              </div>
            </div>
        </div>
        </div>
    </div>
  </div>
  )
}