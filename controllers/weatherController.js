import Weather from '../models/weatherModel.js';
import Summary from '../models/summaryModel.js';
import axios from 'axios';


export const retrieveWeather = async (req, res) => {
    const { city } = req.query;

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        // console.log(apiKey)
        if (!apiKey) {
            return res.status(500).json({ message: 'API key is not configured.' });
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp, 
            feels_like: response.data.main.feels_like, 
            weather: response.data.weather[0].main,
            timestamp: new Date(response.data.dt * 1000), 
        };


        await Weather.create(weatherData);
        res.status(200).json(weatherData);
    } catch (error) {
        console.error('Error retrieving weather data:', error.message);
        res.status(500).json({ message: 'Error retrieving weather data', error: error.message });
    }
};



export const getDailySummary = async (req, res) => {
    const { city } = req.query;

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weatherRecords = await Weather.find({
            city: city,
            timestamp: { $gte: today }
        });

        if (weatherRecords.length === 0) {
            return res.status(404).json({ message: `No weather data found for ${city} today.` });
        }

        const totalTemp = weatherRecords.reduce((sum, record) => sum + record.temperature, 0);
        const maxTemp = Math.max(...weatherRecords.map(record => record.temperature));
        const minTemp = Math.min(...weatherRecords.map(record => record.temperature));
        // console.log(minTemp, maxTemp);

        const weatherCount = {};
        weatherRecords.forEach(record => {
            weatherCount[record.weather] = (weatherCount[record.weather] || 0) + 1;
        });

        const dominantWeather = Object.keys(weatherCount).reduce((a, b) => weatherCount[a] > weatherCount[b] ? a : b);

     
        const dailySummary = {
            city: city,
            date: today, 
            averageTemperature: totalTemp / weatherRecords.length,
            maximumTemperature: maxTemp,
            minimumTemperature: minTemp,
            dominantWeather: dominantWeather
        };

        
        await Summary.findOneAndUpdate(
            { city: city, date: today },  
            dailySummary,                
            { upsert: true, new: true }  
        );

     
        res.status(200).json(dailySummary);
    } catch (error) {
        console.error('Error fetching daily summary:', error.message);
        res.status(500).json({ message: 'Error fetching daily summary', error: error.message });
    }
};
