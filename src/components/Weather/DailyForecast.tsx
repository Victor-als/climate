/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays } from "lucide-react";

interface DailyForecastProps {
  weatherData: any;
  formatTemperature: (temp: number) => number;
  formatDate: (timestamp: number) => string;
  getIconUrl: (iconCode: string) => string;
}

export function DailyForecast({ weatherData, formatTemperature, formatDate, getIconUrl}: DailyForecastProps) {
  return (
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
  )
}