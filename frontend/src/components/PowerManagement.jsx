import React from 'react';
import { Battery, Sun, Zap } from 'lucide-react';

export default function PowerManagement({ data }) {
  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-2xl font-bold">Manajemen Energi Solar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel Solar */}
        <div className="card border-t-4 border-t-orange-400">
          <div className="flex items-center gap-2 mb-6">
            <Sun className="text-orange-400" size={24} />
            <h3 className="font-bold text-lg">Input Panel Solar</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">Tegangan (V)</span>
              <span className="font-bold text-slate-800">{data.power.solarVoltage.toFixed(2)} V</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">Arus (mA)</span>
              <span className="font-bold text-slate-800">{data.power.solarCurrent.toFixed(2)} mA</span>
            </div>
            <div className="flex justify-between bg-slate-50 p-3 rounded-lg border">
              <span className="text-slate-700 font-medium">Daya Dihasilkan (W)</span>
              <span className="font-bold text-orange-600 text-lg">{data.power.solarPower.toFixed(3)} W</span>
            </div>
          </div>
        </div>

        {/* Pengisian Baterai */}
        <div className="card border-t-4 border-t-blue-500">
           <div className="flex items-center gap-2 mb-6">
            <Battery className="text-blue-500" size={24} />
            <h3 className="font-bold text-lg">Output Baterai / Beban</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">Tegangan (V)</span>
              <span className="font-bold text-slate-800">{data.power.batteryVoltage.toFixed(2)} V</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">Arus Beban (mA)</span>
              <span className="font-bold text-slate-800">{data.power.batteryCurrent.toFixed(2)} mA</span>
            </div>
            <div className="flex justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
              <span className="text-blue-900 font-medium">Daya Digunakan (W)</span>
              <span className="font-bold text-blue-700 text-lg">{data.power.batteryPower.toFixed(3)} W</span>
            </div>
          </div>
        </div>
      </div>

      {/* Efisiensi Sistem Box */}
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
            <Zap className="text-yellow-500" size={20} />
            <h3 className="font-bold text-lg">Performa Sistem</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-slate-50 p-4 rounded-xl border">
            <p className="text-sm text-slate-500 mb-2">Efisiensi Transfer Daya</p>
            <div className="text-4xl font-bold text-green-500">{data.power.systemEfficiency.toFixed(1)}%</div>
            <p className="text-xs text-slate-400 mt-2">Daya Input vs Output</p>
          </div>
          
          <div className="text-center bg-slate-50 p-4 rounded-xl border flex flex-col justify-center">
            <p className="text-sm text-slate-500 mb-4">Pemakaian Daya Real-Time</p>
            <div className="flex justify-around items-center">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Input</p>
                <p className="font-bold text-orange-500">{data.power.solarPower.toFixed(2)} W</p>
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Output</p>
                <p className="font-bold text-blue-600">{data.power.batteryPower.toFixed(2)} W</p>
              </div>
            </div>
          </div>
          
          <div className="text-center bg-slate-50 p-4 rounded-xl border flex flex-col items-center justify-center">
             <p className="text-sm text-slate-500 mb-3">Status Pengisian</p>
             {data.power.solarVoltage > data.power.batteryVoltage ? (
               <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200">
                 Panel Aktif - Mengisi Daya
               </span>
             ) : (
               <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold border border-amber-200">
                 Panel Pasif - Menggunakan Baterai
               </span>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}