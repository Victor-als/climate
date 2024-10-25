import { Droplet, MapPin } from "lucide-react";


interface WeatherHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentWeather: any;
  formatTemperature: (temp: number) => number;
  getIconUrl: (iconCode: string) => string;
}


export function WeatherCard ({ currentWeather, formatTemperature, getIconUrl }: WeatherHeaderProps) {
  return (
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
  )
}