import React from 'react';
import { Fan, Lightbulb, ActivitySquare } from 'lucide-react';

export default function DeviceControl({ data, onUpdate }) {
  const isAuto = data.deviceStatus.mode === 'AUTO';

  const toggleMode = (mode) => {
    onUpdate({ mode });
  };

  const toggleDevice = (device, currentStatus) => {
    if (isAuto) return;
    onUpdate({ [device]: !currentStatus });
  };

  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-2xl font-bold">Kontrol Perangkat</h1>

      {/* Mode Operasi */}
      <div className="card flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Mode Operasi</h3>
          <p className="text-sm text-gray-500">Beralih antara kontrol otomatis (Sensor) dan manual (Web)</p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-1 border">
          <button 
            onClick={() => toggleMode('AUTO')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${isAuto ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >Otomatis</button>
          <button 
            onClick={() => toggleMode('MANUAL')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${!isAuto ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >Manual</button>
        </div>
      </div>

      {/* Status Perangkat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Kartu Kipas */}
        <div className={`p-6 rounded-xl border transition-all ${data.deviceStatus.fanStatus ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-start mb-8">
            <div>
              <h4 className="font-bold text-lg text-slate-800">Kipas</h4>
              <p className="text-sm text-slate-500">{data.deviceStatus.fanStatus ? 'Mendinginkan sistem' : 'Standby'}</p>
            </div>
            <Fan className={`${data.deviceStatus.fanStatus ? 'text-blue-500 animate-spin' : 'text-slate-300'}`} size={36} />
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm font-bold ${data.deviceStatus.fanStatus ? 'text-green-600' : 'text-slate-400'}`}>
              Status: {data.deviceStatus.fanStatus ? 'Aktif' : 'Tidak Aktif'}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">OFF</span>
              <button 
                onClick={() => toggleDevice('fanStatus', data.deviceStatus.fanStatus)}
                disabled={isAuto}
                className={`w-14 h-7 rounded-full relative transition-colors duration-300 focus:outline-none ${data.deviceStatus.fanStatus ? 'bg-blue-600' : 'bg-slate-300'} ${isAuto ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-300 ${data.deviceStatus.fanStatus ? 'translate-x-8' : 'translate-x-1'} shadow-sm`}></div>
              </button>
              <span className="text-xs font-bold text-slate-400">ON</span>
            </div>
          </div>
          {isAuto && <p className="text-xs text-blue-500 mt-4 text-right">Kontrol dikunci (Mode Otomatis)</p>}
        </div>

        {/* Kartu Lampu */}
        <div className={`p-6 rounded-xl border transition-all ${data.deviceStatus.lightStatus ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-start mb-8">
            <div>
              <h4 className="font-bold text-lg text-slate-800">Lampu</h4>
              <p className="text-sm text-slate-500">{data.deviceStatus.lightStatus ? 'Menerangi area' : 'Standby'}</p>
            </div>
            <Lightbulb className={`${data.deviceStatus.lightStatus ? 'text-amber-400' : 'text-slate-300'}`} size={36} />
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm font-bold ${data.deviceStatus.lightStatus ? 'text-green-600' : 'text-slate-400'}`}>
              Status: {data.deviceStatus.lightStatus ? 'Aktif' : 'Tidak Aktif'}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">OFF</span>
              <button 
                onClick={() => toggleDevice('lightStatus', data.deviceStatus.lightStatus)}
                disabled={isAuto}
                className={`w-14 h-7 rounded-full relative transition-colors duration-300 focus:outline-none ${data.deviceStatus.lightStatus ? 'bg-amber-500' : 'bg-slate-300'} ${isAuto ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-300 ${data.deviceStatus.lightStatus ? 'translate-x-8' : 'translate-x-1'} shadow-sm`}></div>
              </button>
              <span className="text-xs font-bold text-slate-400">ON</span>
            </div>
          </div>
          {isAuto && <p className="text-xs text-amber-600 mt-4 text-right">Kontrol dikunci (Mode Otomatis)</p>}
        </div>
      </div>

      {/* Kondisi Lingkungan (Tambahan Sensor PIR dari Skripsi) */}
      <div className="card mt-8 bg-slate-50 border-slate-200 shadow-inner">
        <h3 className="font-semibold mb-4 text-slate-700 flex items-center gap-2"><ActivitySquare size={18}/> Referensi Sensor (Real-Time)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded border text-center">
            <p className="text-xs text-slate-400">Suhu Saat Ini</p>
            <p className="font-bold text-lg text-slate-800">{data.sensors.temperature.toFixed(1)}°C</p>
          </div>
          <div className="bg-white p-3 rounded border text-center">
            <p className="text-xs text-slate-400">Kelembapan</p>
            <p className="font-bold text-lg text-slate-800">{data.sensors.humidity.toFixed(1)}%</p>
          </div>
          <div className="bg-white p-3 rounded border text-center">
            <p className="text-xs text-slate-400">Tingkat Cahaya (LDR)</p>
            <p className="font-bold text-lg text-slate-800">{data.sensors.lightLevel}</p>
          </div>
          <div className="bg-white p-3 rounded border text-center relative overflow-hidden">
            <p className="text-xs text-slate-400">Gerakan (PIR)</p>
            <p className={`font-bold text-lg ${data.sensors.motion ? 'text-red-500' : 'text-slate-800'}`}>
              {data.sensors.motion ? 'Terdeteksi' : 'Tidak Ada'}
            </p>
            {/* Animasi ping jika ada gerakan */}
            {data.sensors.motion && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full m-2 animate-ping"></div>}
          </div>
        </div>
      </div>
    </div>
  );
}