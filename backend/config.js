// File: backend/config.js

require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",
  // Threshold values sesuai dengan kode Arduino
  thresholds: {
    temperature: {
      high: 33.0, // Threshold untuk menyalakan kipas
      low: 28.0, // Threshold untuk mematikan kipas
    },
    humidity: {
      high: 80.0,
      hysteresis: 5.0,
    },
    light: {
      dark: 1100, // Threshold untuk menyalakan lampu
      bright: 900, // Threshold untuk mematikan lampu
    },
  },
  // Default device setting jika tidak ada data di database
  defaultDeviceStatus: {
    fanStatus: false,
    lightStatus: false,
    mode: "AUTO",
  },
  // Konfigurasi timeout untuk request API
  api: {
    timeout: 5000, // Timeout dalam ms
    retries: 2, // Jumlah percobaan ulang jika request gagal
  },
  // Konfigurasi sensor
  sensors: {
    dht: {
      retryDelay: 2000, // Delay antar retry untuk sensor DHT
      maxRetries: 5, // Jumlah maksimum retry untuk sensor DHT
    },
    ina219: {
      inputAddress: "0x40", // Alamat I2C untuk sensor daya input
      outputAddress: "0x41", // Alamat I2C untuk sensor daya output
      maxVoltage: 32, // Voltase maksimum yang valid
      maxCurrent: 2000, // Arus maksimum dalam mA yang valid
    },
    ldr: {
      maxValue: 4095, // Nilai maksimum ADC untuk ESP32
    },
  },
  // Detail sistem solar
  solarSystem: {
    solarPanel: {
      maxPower: 5000, // Daya maksimum panel dalam mW
      type: "Monocrystalline", // Tipe panel
    },
    battery: {
      capacity: 12000, // Kapasitas baterai dalam mAh
      type: "Lithium Ion", // Tipe baterai
    },
  },
};