"use client";
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://david-chan-ho2-github-io.onrender.com/api/daily-averages')
            .then((res) => res.json())
            .then(setData);
    }, []);
    return (<div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Daily Weather Averages</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="date"/>
          <YAxis label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgTemp" stroke="#ff4c4c" name="Temperature"/>
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="date"/>
          <YAxis orientation="left" label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgHumidity" stroke="#4c6cff" name="Humidity"/>
        </LineChart>
      </ResponsiveContainer>
    </div>);
}
//# sourceMappingURL=page.js.map