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
        cnt: 40, // Pegando até 5 dias de previsão com intervalos de 3 horas
      },
    });

    if (response.data && response.data.list) {
      return response.data; // Garante que a função retorna corretamente
    } else {
      console.error("Erro: Dados de previsão não estão no formato esperado.");
      return { list: [] }; // Retorna um objeto vazio para evitar erro de undefined
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
        lat,  // Latitude da cidade
        lon,  // Longitude da cidade
        appid: apiKey,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados de qualidade do ar:', error);
    throw error;
  }
};