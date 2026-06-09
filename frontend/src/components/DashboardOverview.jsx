import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardOverview({ data, chartData }) {
  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      {/* Kartu Sensor Utama */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-gray-500 text-sm mb-2">Temperature</p>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold text-blue-600">{data.sensors.temperature.toFixed(1)}°C</div>
          </div>
          <div className="progress-bar mt-4"><div className="progress-bar-fill bg-blue-600" style={{ width: `${(data.sensors.temperature / 50) * 100}%` }}></div></div>
        </div>
        
        <div className="card">
          <p className="text-gray-500 text-sm mb-2">Humidity</p>
          <div className="text-3xl font-bold text-blue-600">{data.sensors.humidity.toFixed(1)}%</div>
          <div className="progress-bar mt-4"><div className="progress-bar-fill bg-blue-400" style={{ width: `${data.sensors.humidity}%` }}></div></div>
        </div>
        
        <div className="card">
          <p className="text-gray-500 text-sm mb-2">Light Level</p>
          <div className="text-3xl font-bold">{data.sensors.lightLevel}</div>
          <p className="text-xs text-gray-400 mt-2">{data.sensors.lightLevel > 2950 ? 'Gelap (Butuh Lampu)' : 'Terang'}</p>
        </div>
        
        <div className="card">
          <p className="text-gray-500 text-sm mb-2">Power Usage</p>
          <div className="text-3xl font-bold">{data.power.solarPower.toFixed(2)}W</div>
          <p className="text-xs text-gray-400 mt-2">Daya panel surya</p>
        </div>
      </div>

      {/* Status & Efisiensi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-4">Device Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b pb-2">
              <span className="text-gray-600">Kipas (Pendingin)</span>
              <span className={`status-badge ${data.deviceStatus.fanStatus ? 'status-active' : 'status-inactive'}`}>
                {data.deviceStatus.fanStatus ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b pb-2">
              <span className="text-gray-600">Lampu</span>
              <span className={`status-badge ${data.deviceStatus.lightStatus ? 'status-active' : 'status-inactive'}`}>
                {data.deviceStatus.lightStatus ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Operation Mode</span>
              <span className={`status-badge ${data.deviceStatus.mode === 'AUTO' ? 'status-auto' : 'status-manual'}`}>
                {data.deviceStatus.mode}
              </span>
            </div>
          </div>
        </div>
        
        <div className="card flex flex-col items-center justify-center">
          <h3 className="font-semibold mb-2 self-start w-full">System Efficiency</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-red-500">{data.power.systemEfficiency.toFixed(1)}%</div>
            <p className="text-gray-500 text-sm mt-2">Efisiensi Transfer Daya (Output/Input)</p>
          </div>
        </div>
      </div>

      {/* Grafik Real-Time */}
      <div className="card">
        <h3 className="font-semibold mb-6">Sensor Readings (Real-Time)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12}} />
              <YAxis yAxisId="left" tick={{fontSize: 12}} />
              <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#4f46e5" name="Temp (°C)" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line yAxisId="left" type="monotone" dataKey="hum" stroke="#38bdf8" name="Humidity (%)" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line yAxisId="right" type="monotone" dataKey="light" stroke="#fbbf24" name="Light" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}