/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const apiKey = '79e5ae406a69834d1df458a76763d745';
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

      // Filtra as previsões para o dia atual e a partir da hora atual
      let todayForecasts = response.data.list.filter((forecast: { dt: number }) => {
        const forecastDate = new Date(forecast.dt * 1000);
        const forecastDay = forecastDate.getDate();
        const forecastHour = forecastDate.getHours();

        // Retorna apenas as previsões para o dia atual e a partir da hora atual
        return forecastDay === today && forecastHour >= currentHour;
      });

      // Se não houver previsões para o restante do dia, pegar previsões futuras
      if (todayForecasts.length === 0) {
        todayForecasts = response.data.list.filter((forecast: { dt: number }) => {
          const forecastDate = new Date(forecast.dt * 1000);
          const forecastDay = forecastDate.getDate();

          // Pega a previsão para o próximo dia
          return forecastDay > today;
        });
      }

      if (todayForecasts.length > 0) {
        // Extrai as probabilidades de chuva para cada previsão
        const rainProbabilities = todayForecasts.map((forecast: any) => forecast.pop);
        
        // Calcula a média da probabilidade de chuva
        const avgRainProbability = rainProbabilities.reduce((a: any, b: any) => a + b, 0) / rainProbabilities.length;
        
        console.log("Probabilidade de Chuva:", avgRainProbability);
       
        return {
          ...response.data,
          rainProbability: avgRainProbability, // Retorna a probabilidade média de chuva
        };
      } else {
        console.error("Erro: Não há previsões disponíveis.");
        return { rainProbability: null }; // Retorna null se não houver previsões
      }
    } else {
      console.error("Erro: Dados de previsão não estão no formato esperado.");
      return { rainProbability: null }; // Retorna null para evitar erros
    }
  } catch (error) {
    console.error('Erro ao buscar os dados do clima:', error);
    throw error;
  }
};

export const getCurrentWeatherData = async (city: string) => {
  try {
    const response = await axios.get(`${baseUrl}/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'pt_br',
      }
    });
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
