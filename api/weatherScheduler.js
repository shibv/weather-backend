import cron from 'node-cron';
import axios from 'axios';
import Weather from '../models/weatherModel.js'; 


const apiKey = process.env.OPENWEATHER_API_KEY; 
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Function to fetch weather data for a city
async function fetchWeatherData(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const weatherData = response.data;

        const temperatureKelvin = weatherData.main.temp;
        const temperatureCelsius = temperatureKelvin - 273.15; // Convert to Celsius
        const feelsLikeKelvin = weatherData.main.feels_like;
        const feelsLikeCelsius = feelsLikeKelvin - 273.15; // Convert to Celsius

        // Create a new weather entry in the database
        const newWeatherEntry = new Weather({
            city: city,
            temperature: temperatureCelsius,
            feels_like: feelsLikeCelsius,
            weather: weatherData.weather[0].main,
        });

        await newWeatherEntry.save();
        console.log(`Weather data saved for ${city}: ${temperatureCelsius.toFixed(2)}°C, Feels Like: ${feelsLikeCelsius.toFixed(2)}°C`);
    } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error.message);
    }
}

// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
    console.log('Fetching weather data...');
    cities.forEach(city => {
        fetchWeatherData(city);
    });
});
