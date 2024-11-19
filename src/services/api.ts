/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY as string;
const baseUrl = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city: string) => {
  try {
    const response = await axios.get(`${baseUrl}/forecast`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'pt_br',
        cnt: 40,
      },
    });

    if (response.data && response.data.list) {
      const currentDate = new Date();
      const today = currentDate.getDate();
      const currentHour = currentDate.getHours();

      let todayForecasts = response.data.list.filter((forecast: { dt: number }) => {
        const forecastDate = new Date(forecast.dt * 1000);
        const forecastDay = forecastDate.getDate();
        const forecastHour = forecastDate.getHours();

        return forecastDay === today && forecastHour >= currentHour;
      });

      if (todayForecasts.length === 0) {
        todayForecasts = response.data.list.filter((forecast: { dt: number }) => {
          const forecastDate = new Date(forecast.dt * 1000);
          const forecastDay = forecastDate.getDate();

          return forecastDay > today;
        });
      }

      if (todayForecasts.length > 0) {
        const rainProbabilities = todayForecasts.map((forecast: any) => forecast.pop);
        const avgRainProbability = rainProbabilities.reduce((a: any, b: any) => a + b, 0) / rainProbabilities.length;

        return {
          ...response.data,
          rainProbability: avgRainProbability,
        };
      } else {
        console.error("Erro: Não há previsões disponíveis.");
        return { rainProbability: null };
      }
    } else {
      console.error("Erro: Dados de previsão não estão no formato esperado.");
      return { rainProbability: null };
    }
  } catch (error) {
    console.error('Erro ao buscar os dados do clima:', error);
    throw error;
  }
};

export const getCurrentWeatherData = async (lat?: number, lon?: number, city?: string) => {
  try {
    const params = city
      ? { q: city, appid: apiKey, units: 'metric', lang: 'pt_br' }
      : { lat, lon, appid: apiKey, units: 'metric', lang: 'pt_br' };

    const response = await axios.get(`${baseUrl}/weather`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados do clima atual:', error);
    throw error;
  }
};

export const getAirQualityData = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${baseUrl}/air_pollution`, {
      params: {
        lat,  
        lon,  
        appid: apiKey,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados de qualidade do ar:', error);
    throw error;
  }
};

export const getUVIndex = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${baseUrl}/uvi`, {
      params: {
        lat, 
        lon,  
        appid: apiKey,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o índice UV:', error);
    throw error;
  }
};
