
import axios from 'axios';

export interface ApiResponse {
    source: string;
    data: any;
}

export class ApiManager {
    // Method to get weather information from an external API
    async getWeatherData(city: string): Promise<ApiResponse> {
        try {
            const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}&units=metric\\`);
            return { source: 'WeatherAPI', data: response.data };
        } catch (error) {
            console.error('Error fetching weather data:', (error as any).message);
            throw error;
        }
    }

    // Method to get news from an external API
    async getNewsData(topic: string): Promise<ApiResponse> {
        try {
            const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
            const response = await axios.get(`https://newsapi.org/v2/everything?q=\${topic}&apiKey=\${apiKey}\\`);
            return { source: 'NewsAPI', data: response.data.articles };
        } catch (error) {
            console.error('Error fetching news data:', (error as any).message);
            throw error;
        }
    }
}
