import mongoose from 'mongoose';


const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    temperature: {
        type: Number, 
        required: true,
    },
    feels_like: {
        type: Number, 
        required: true,
    },
    weather: {
        type: String, 
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now, 
    },
});


const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
