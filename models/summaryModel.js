import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
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

// create a compound unique index on city and date
summarySchema.index({ city: 1, date: 1 }, { unique: true });

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;
