"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// Access secret keys from .env file
dotenv_1.default.config();
// Create instance of Express
const app = (0, express_1.default)();
// Use cors to allow frontend to access backend
app.use((0, cors_1.default)());
// Constants
const PORT = process.env.PORT || 3001;
const THINGSPEAK_CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID;
const THINGSPEAK_API_KEY = process.env.THINGSPEAK_API_KEY;
// Get data 
const getData = async (req, res) => {
    try {
        const { data } = await axios_1.default.get(`https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_API_KEY}&results=8000`);
        const feeds = data.feeds;
        const dayMap = {};
        feeds.forEach((f) => {
            const date = new Date(f.created_at);
            const dayKey = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
            const temp = parseFloat(f.field1);
            const humid = parseFloat(f.field2);
            if (isNaN(temp))
                return;
            if (!dayMap[dayKey]) {
                dayMap[dayKey] = { tempSum: 0, humidSum: 0, count: 0 };
            }
            dayMap[dayKey].tempSum += temp;
            if (!isNaN(humid))
                dayMap[dayKey].humidSum += humid;
            dayMap[dayKey].count++;
        });
        const daily = Object.entries(dayMap).map(([date, { tempSum, humidSum, count }]) => ({
            date,
            avgTemp: parseFloat((tempSum / count).toFixed(2)),
            avgHumidity: parseFloat((humidSum / count).toFixed(2)),
        }));
        res.json(daily);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch or process data' });
    }
};
// Endpoint for GET daily averages data endpoint
app.get("/api/daily-averages", getData);
// Listen to server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map