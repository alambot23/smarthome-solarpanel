import React from 'react';
import { FileText } from 'lucide-react';

export default function SensorLog({ chartData }) {
  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-2xl font-bold">Detail Sensor Log</h1>
      
      <div className="card overflow-hidden border-t-4 border-t-indigo-500">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="text-indigo-500" size={24} />
          <h3 className="font-bold text-lg">Riwayat Pembacaan Sensor</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold">Waktu Masuk</th>
                <th scope="col" className="px-6 py-4 font-bold text-center">Suhu (°C)</th>
                <th scope="col" className="px-6 py-4 font-bold text-center">Kelembapan (%)</th>
                <th scope="col" className="px-6 py-4 font-bold text-center">Cahaya (Lux)</th>
              </tr>
            </thead>
            <tbody>
              {chartData && chartData.length > 0 ? (
                // Gunakan slice().reverse() agar data terbaru muncul paling atas di tabel
                chartData.slice().reverse().map((data, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                      {data.time}
                    </td>
                    <td className="px-6 py-4 text-center text-blue-600 font-semibold">
                      {data.temp.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 text-center text-blue-400 font-semibold">
                      {data.hum.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 text-center text-amber-500 font-semibold">
                      {data.light}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-400 bg-slate-50">
                    <div className="animate-pulse">Belum ada data sensor yang terekam. Menunggu kiriman data dari ESP32...</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4 text-right">
          *Menampilkan maksimal 15 rekam data terakhir (Real-Time).
        </p>
      </div>
    </div>
  );
}