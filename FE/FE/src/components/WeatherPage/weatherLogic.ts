const BEpath = "http://localhost:4000";

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export const fetchWeather = async ():Promise<WeatherData | undefined> => {
    console.log("Fetching weather data...");
    try {
      const response = await fetch(`${BEpath}/feature/weather`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      
      const data = await response.json();
      const returnedData:WeatherData = {
        temperature:data.temperature,
        description:data.description,
        humidity:data.description,
        windSpeed:data.windSpeed
      }

      return returnedData;
    } catch (error) {
      console.error("Fetch error:", error);
      return;
    }
  };

const foodBasedOnTemapture = async() =>
{
    
}
  