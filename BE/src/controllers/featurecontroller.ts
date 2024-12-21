import axios from "axios"
import { Request, Response } from 'express';

export const featureController = {
    getlocation: async(req: Request, res: Response) => {
        try {
            const response = await axios.get('https://ipapi.co/json/');
            res.json(response.data);
        } catch (error: any) {
            res.status(500).json({ error: `Failed to get location: ${error.message}` });
        }
    },

    getWeather: async(req: Request, res: Response) => {
        try {
            const locationResponse = await axios.get('https://ipapi.co/json/');
            const location = locationResponse.data;
            
            const WEATHER_API_KEY = '290cc0ecf698b1162c24d15b973ac5bf'; 
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${WEATHER_API_KEY}`
            );

            const weatherData = {
                temperature: weatherResponse.data.main.temp,
                description: weatherResponse.data.weather[0].description,
                humidity: weatherResponse.data.main.humidity,
                windSpeed: weatherResponse.data.wind.speed,
            };

            res.json({ weather: weatherData });
        } catch (error: any) {
            res.status(500).json({ error: `Failed to get weather: ${error.message}` });
        }
    }
};