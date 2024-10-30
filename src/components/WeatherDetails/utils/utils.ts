export const getAirQualityCategory = (aqi: number) => {
  switch (aqi) {
    case 1:
      return { label: "Boa", className: "bg-green-700 rounded-xl text-green-100 px-4 font-semibold" };
    case 2:
      return { label: "Moderada", className: "bg-yellow-600 rounded-xl text-yellow-50 px-4 font-semibold" };
    case 3:
      return { label: "Ruim", className: "bg-orange-600 rounded-xl text-orange-100 px-4 font-semibold" };
    case 4:
      return { label: "Ruim", className: "bg-red-500 px-4 text-red-100 font-semibold rounded-xl" };
    case 5:
      return { label: "Muito ruim", className: "bg-red-900 px-4 font-semibold text-red-100 rounded-xl" };
    default:
      return { label: "Desconhecida", className: "bg-gray-500 text-gray-50 px-4 font-semibold rounded-xl" };
  }
};

export const getWindDirection = (degree: number) => {
  if (degree > 337.5 || degree <= 22.5) return "Norte";
  if (degree > 22.5 && degree <= 67.5) return "Nordeste";
  if (degree > 67.5 && degree <= 112.5) return "Leste";
  if (degree > 112.5 && degree <= 157.5) return "Sudeste";
  if (degree > 157.5 && degree <= 202.5) return "Sul";
  if (degree > 202.5 && degree <= 247.5) return "Sudoeste";
  if (degree > 247.5 && degree <= 292.5) return "Oeste";
  if (degree > 292.5 && degree <= 337.5) return "Noroeste";
  return "";
};

export const getMoonPhase = (date: Date) => {
  const moonCycle = 29.53;
  const baseDate = new Date(2000, 0, 6);
  const daysSinceBase = (date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);
  const phase = (daysSinceBase % moonCycle) / moonCycle;

  if (phase < 0.03) return "Nova";
  if (phase < 0.25) return "Crescente";
  if (phase < 0.27) return "Quarto Crescente";
  if (phase < 0.53) return "Cheia";
  if (phase < 0.75) return "Minguante";
  if (phase < 0.77) return "Quarto Minguante";
  return "Nova";
};

export const formatTemperature = (temp: number) => Math.round(temp);

export const formatTime = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });