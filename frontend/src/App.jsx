import React, { useState, useEffect } from 'react';
import DashboardOverview from './components/DashboardOverview';
import DeviceControl from './components/DeviceControl';
import PowerManagement from './components/PowerManagement';
import SensorLog from './components/SensorLog'; 
import { Activity } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemData, setSystemData] = useState(null);
  const [chartData, setChartData] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://smarthome-solarpanel.vercel.app/api/system');
        const data = await response.json();
        setSystemData(data);

        // Update data grafik/tabel dengan waktu saat ini
        const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        setChartData(prevData => {
          const newDataPoint = {
            time: currentTime,
            temp: data.sensors.temperature,
            hum: data.sensors.humidity,
            light: data.sensors.lightLevel
          };

          const updatedChart = [...prevData, newDataPoint];
          if (updatedChart.length > 15) updatedChart.shift();
          return updatedChart;
        });

      } catch (error) {
        console.error("Gagal mengambil data dari backend:", error);
      }
    };
    
    fetchData(); // Panggil langsung pertama kali
    const interval = setInterval(fetchData, 2000); // Polling setiap 2 detik
    return () => clearInterval(interval);
  }, []);

  const updateDeviceControl = async (controlData) => {
    try {
      await fetch('https://smarthome-solarpanel.vercel.app/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(controlData)
      });
      // Ambil data terbaru setelah merubah status
      const response = await fetch('https://smarthome-solarpanel.vercel.app/api/system');
      setSystemData(await response.json());
    } catch (error) {
      console.error("Gagal mengupdate kontrol:", error);
    }
  };

  if (!systemData) return <div className="flex h-screen items-center justify-center text-xl text-blue-600 font-bold animate-pulse">Menghubungkan ke IoT...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navbar - Hanya 4 Tombol Saja */}
      <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-xl">
          <Activity size={24} />
          Arduino Monitoring System
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-500">
          <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition-colors'}>Dashboard</button>
          <button onClick={() => setActiveTab('sensor')} className={activeTab === 'sensor' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition-colors'}>Sensor</button>
          <button onClick={() => setActiveTab('device')} className={activeTab === 'device' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition-colors'}>Device</button>
          {/* <button onClick={() => setActiveTab('power')} className={activeTab === 'power' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition-colors'}>Power</button> */}
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto p-8">
        {activeTab === 'dashboard' && <DashboardOverview data={systemData} chartData={chartData} />}
        {activeTab === 'sensor' && <SensorLog chartData={chartData} />}
        {activeTab === 'device' && <DeviceControl data={systemData} onUpdate={updateDeviceControl} />}
        {activeTab === 'power' && <PowerManagement data={systemData} />}
      </main>
    </div>
  );
}

export default App;