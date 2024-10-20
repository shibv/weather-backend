import Weather from '../models/weatherModel.js';

export const triggerAlert = async (req, res) => {
    const { city, temp_threshold, condition } = req.body;

    try {
        const latestWeather = await Weather.findOne({ city }).sort({ timestamp: -1 });

        if (!latestWeather) {
            return res.status(404).json({ message: `No weather data found for city ${city}` });
        }

        let tempAlert = false;
        let conditionAlert = false;

        if (temp_threshold && latestWeather.temperature >= temp_threshold) {
            tempAlert = true;
        }

       
        if (condition && latestWeather.weather.toLowerCase() === condition.toLowerCase()) {
            conditionAlert = true;
        }

     
        let alertMessage = 'No thresholds crossed.';

        if (tempAlert && conditionAlert) {
            alertMessage = `Temperature has crossed ${temp_threshold}°C and condition is ${condition} in ${city}.`;
        } else if (tempAlert) {
            alertMessage = `Temperature has crossed ${temp_threshold}°C in ${city}.`;
        } else if (conditionAlert) {
            alertMessage = `Weather condition is ${condition} in ${city}.`;
        }

        res.status(200).json({ alert: tempAlert || conditionAlert, message: alertMessage });

    } catch (error) {
        console.error(`Error checking alert for city ${city}:`, error);
        res.status(500).json({ message: 'Error checking alert' });
    }
};
