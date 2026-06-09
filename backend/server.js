const express = require("express");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database (Menyimpan data real-time dari alat)
let systemState = {
  sensors: {
    temperature: 0.0,
    humidity: 0.0,
    lightLevel: 0,
    motion: false // Tambahan dari skripsi (Sensor PIR)
  },
  power: {
    solarVoltage: 0.0,
    solarCurrent: 0.0,
    solarPower: 0.0,
    batteryVoltage: 0.0,
    batteryCurrent: 0.0,
    batteryPower: 0.0,
    systemEfficiency: 0.0,
  },
  deviceStatus: {
    fanStatus: false,
    lightStatus: false,
    mode: "AUTO",
  },
};

// 1. ENDPOINT UNTUK REACT FRONTEND (Membaca seluruh data)
app.get("/api/system", (req, res) => {
  res.json(systemState);
});

// 2. ENDPOINT UNTUK REACT FRONTEND (Mengontrol Mode Manual)
app.post("/api/control", (req, res) => {
  const { mode, fanStatus, lightStatus } = req.body;
  if (mode !== undefined) systemState.deviceStatus.mode = mode;
  
  if (systemState.deviceStatus.mode === "MANUAL") {
    if (fanStatus !== undefined) systemState.deviceStatus.fanStatus = fanStatus;
    if (lightStatus !== undefined) systemState.deviceStatus.lightStatus = lightStatus;
  }
  res.json({ message: "Status diperbarui", status: systemState.deviceStatus });
});

// ==============================================================
// ENDPOINT KHUSUS UNTUK ESP32 (Berdasarkan Lampiran Skripsi)
// ==============================================================

// 3. ESP32 Meminta Status Perangkat (Auto/Manual & Relay)
app.get("/api/devices/status", (req, res) => {
  res.json({
    status: "success",
    data: systemState.deviceStatus
  });
});

// 4. ESP32 Mengirim Data Lingkungan (Suhu, Cahaya, Gerak)
app.post("/api/environment", (req, res) => {
  const { temperature, humidity, lightLevel, motion } = req.body;
  
  if (temperature !== undefined) systemState.sensors.temperature = temperature;
  if (humidity !== undefined) systemState.sensors.humidity = humidity;
  if (lightLevel !== undefined) systemState.sensors.lightLevel = lightLevel;
  if (motion !== undefined) systemState.sensors.motion = motion;

  res.status(201).json({ message: "Data environment diterima" });
});

// 5. ESP32 Mengirim Data Daya (INA219)
app.post("/api/power", (req, res) => {
  const data = req.body;
  
  // Data Panel Surya
  if (data.inputBusVoltage !== undefined) systemState.power.solarVoltage = data.inputBusVoltage;
  if (data.inputCurrent !== undefined) systemState.power.solarCurrent = data.inputCurrent;
  if (data.inputPower !== undefined) systemState.power.solarPower = data.inputPower / 1000; // Ubah mW ke W

  // Data Baterai
  if (data.outputBusVoltage !== undefined) systemState.power.batteryVoltage = data.outputBusVoltage;
  if (data.outputCurrent !== undefined) systemState.power.batteryCurrent = data.outputCurrent;
  if (data.outputPower !== undefined) systemState.power.batteryPower = data.outputPower / 1000; // Ubah mW ke W
  
  if (data.efficiency !== undefined) systemState.power.systemEfficiency = data.efficiency;

  res.status(201).json({ message: "Data power diterima" });
});

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server Backend berjalan di port ${config.port}`);
  console.log(`Siap menerima data dari ESP32!`);
});