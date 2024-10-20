# Real-Time Data Processing System for Weather Monitoring with Rollups and Aggregates Backend

This project is a real-time data processing system for monitoring weather conditions in metro cities across India using the OpenWeatherMap API. The system continuously retrieves weather data, provides summarized insights using rollups and aggregates, and triggers alerts based on user-configurable thresholds.

## Features

- Real-time Weather Monitoring: Retrieves weather data for major metro cities in India at configurable intervals.
- Daily Rollups and Aggregates: Calculates daily averages, maximum, and minimum temperatures, and determines the dominant weather condition.
- Alert System: Triggers alerts when weather data exceeds user-defined thresholds.
- Cron Job: Schedules data retrieval and storage at regular intervals (due to Vercel free-tier limitations, the cron job runs once per day).

## Technologies Used

- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)
- API: OpenWeatherMap API for weather data
- Cron Jobs: node-cron for periodic data fetching
- Environment Variables: dotenv for managing sensitive API keys


## Setup

1. Clone the repository:
   ```
   git clone https://github.com/shibv/weather-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in project directory

4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

1. Retrieve Weather Data
   - Endpoint: `GET /api/weather/retrieve`
   - Query Params: `city` (Delhi, Mumbai)
   - Example: `GET /api/weather/retrieve?city=Delhi`

2. Get Daily Weather Summary
   - Endpoint: `GET /api/weather/summary`
   - Query Params: `city` (Delhi, Mumbai)
   - Example: `GET /api/weather/summary?city=Delhi`

3. Check Weather Threshold
   - Endpoint: `POST /api/alerts/trigger`
   - Query Params: `city` (Delhi, Mumbai)
   - Example: `POST /api/alerts/trigger`  
   ```
   {
  "city": "Delhi",
  "temperature": "37.5",
  "condition": "Haze"
  }
  ```
4. Cron Job Setup (weatherScheduler.js)
    - Endpoint: /api/weatherScheduler.js
    - Uncomment the import in app.js file 



## Background Jobs

A cron job is used to retrieve weather data for each city at regular intervals. Due to Vercel's free-tier limitations, this is scheduled to run once daily instead of every 5 minutes.

## Environment Variables

- `PORT`: The port number for the server (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `OPENWEATHER_API_KEY`: openweather api key 
- `fetchInterval`: fetch interval

