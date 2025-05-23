/* eslint-disable @typescript-eslint/no-explicit-any */
import {

  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,

} from "recharts";

interface WeatherChartsProps {
  hourlyForecast: any[];
}

export function WeatherCharts({ hourlyForecast }: WeatherChartsProps) {
  const chartData = hourlyForecast.map((item) => ({
    hour: new Date(item.dt * 1000).getHours() + "h",
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
    wind: item.wind.speed,
    humidity: item.main.humidity,
    rain: item.pop * 100, // probabilidade de chuva %
    pressure: item.main.pressure, // pressão atmosférica
  }));

  return (
    <div className="mt-12 space-y-16">
      {/* Gráfico de Temperatura, Sensação, Vento e Umidade */}
      <div>
        <h2 className="text-white text-2xl font-semibold mb-6">
          Resumo das próximas horas
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00BFFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFeelsLike" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF69B4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF69B4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFA500" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="hour" stroke="#ccc" tick={{ fill: "#ccc", fontSize: 14 }} />
            <YAxis stroke="#ccc" tick={{ fill: "#ccc", fontSize: 14 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: 8,
                color: "#fff",
              }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
              itemStyle={{ color: "#fff" }}
              cursor={{ stroke: "#4B5563", strokeWidth: 1 }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: 20, color: "#ccc", fontSize: 14 }} />

            {/* Removi o CartesianGrid para fundo limpo */}

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#00BFFF"
              fill="url(#colorTemp)"
              strokeWidth={3}
              name="Temperatura (°C)"
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="feels_like"
              stroke="#FF69B4"
              fill="url(#colorFeelsLike)"
              strokeWidth={2}
              name="Sensação Térmica (°C)"
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="wind"
              stroke="#FFA500"
              fill="url(#colorWind)"
              strokeWidth={2}
              name="Vento (m/s)"
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="humidity"
              stroke="#00C49F"
              fill="url(#colorHumidity)"
              strokeWidth={2}
              name="Umidade (%)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Barras — Chuva (azul mais claro) */}
      <div>
        <h2 className="text-white text-2xl font-semibold mb-6">Probabilidade de Chuva (%)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="hour" stroke="#ccc" tick={{ fill: "#ccc", fontSize: 14 }} />
            <YAxis stroke="#ccc" tick={{ fill: "#ccc", fontSize: 14 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: 8,
                color: "#fff",
              }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
              itemStyle={{ color: "#fff" }}
              cursor={{ stroke: "#4B5563", strokeWidth: 1 }}
            />
            <Legend wrapperStyle={{ paddingTop: 20, color: "#ccc", fontSize: 14 }} />
            <Bar dataKey="rain" fill="#1E90FF" name="Chuva (%)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Área — Pressão Atmosférica (gradient azul escuro) */}
      <div>
        <h2 className="text-white text-2xl font-semibold mb-6">Pressão Atmosférica (hPa)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#104E8B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#104E8B" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="hour" stroke="#ccc" tick={{ fill: "#ccc", fontSize: 14 }} />
            <YAxis stroke="#ccc" tick={{ fill: "#ccc", fontSize: 14 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: 8,
                color: "#fff",
              }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
              itemStyle={{ color: "#fff" }}
              cursor={{ stroke: "#4B5563", strokeWidth: 1 }}
            />
            {/* Removi o CartesianGrid para fundo limpo */}

            <Area
              type="monotone"
              dataKey="pressure"
              stroke="#104E8B"
              fill="url(#colorPressure)"
              strokeWidth={3}
              name="Pressão (hPa)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
