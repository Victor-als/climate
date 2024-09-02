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
        cnt: 40 // Para obter os dados das próximas 5 dias (3 horas de intervalo)
      }
    });
    return response.data;
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