"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const react_1 = require("react");
const recharts_1 = require("recharts");
function Home() {
    const [data, setData] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        fetch('http://localhost:3001/api/daily-averages')
            .then((res) => res.json())
            .then(setData);
    }, []);
    return (<div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Daily Weather Averages</h2>
      <recharts_1.ResponsiveContainer width="100%" height={400}>
        <recharts_1.LineChart data={data}>
          <recharts_1.CartesianGrid strokeDasharray="3 3"/>
          <recharts_1.XAxis dataKey="date"/>
          <recharts_1.YAxis label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }}/>
          <recharts_1.Tooltip />
          <recharts_1.Legend />
          <recharts_1.Line type="monotone" dataKey="avgTemp" stroke="#ff4c4c" name="Temperature"/>
        </recharts_1.LineChart>
      </recharts_1.ResponsiveContainer>
      <recharts_1.ResponsiveContainer width="100%" height={400}>
        <recharts_1.LineChart data={data}>
          <recharts_1.CartesianGrid strokeDasharray="3 3"/>
          <recharts_1.XAxis dataKey="date"/>
          <recharts_1.YAxis orientation="left" label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }}/>
          <recharts_1.Tooltip />
          <recharts_1.Legend />
          <recharts_1.Line type="monotone" dataKey="avgHumidity" stroke="#4c6cff" name="Humidity"/>
        </recharts_1.LineChart>
      </recharts_1.ResponsiveContainer>
    </div>);
}
//# sourceMappingURL=page.js.map