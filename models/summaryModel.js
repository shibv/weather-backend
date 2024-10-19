import mongoose from 'mongoose';


const summarySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        unique: true, 
    },
    averageTemperature: {
        type: Number,
        required: true,
    },
    maximumTemperature: {
        type: Number,
        required: true,
    },
    minimumTemperature: {
        type: Number,
        required: true,
    },
    dominantWeather: {
        type: String,
        required: true,
    },
});


const Summary = mongoose.model('Summary', summarySchema);

export default Summary;
