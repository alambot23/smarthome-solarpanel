# 🌞 Smart Solar IoT Monitoring System

### Sistem Cerdas Pemantauan & Kontrol Energi Rumah Berbasis Internet of Things (IoT)

---

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Arduino](https://img.shields.io/badge/Arduino_IDE-00979D?style=for-the-badge&logo=arduino&logoColor=white)](https://www.arduino.cc/)
[![ESP32](https://img.shields.io/badge/ESP32-000000?style=for-the-badge&logo=espressif&logoColor=white)](https://www.espressif.com/)

---

## 📖 Deskripsi Proyek
Proyek ini dikembangkan sebagai implementasi modern dari rancangan sistem IoT untuk pemantauan konsumsi energi berbasis panel surya. Sistem ini mengintegrasikan perangkat keras mikrokontroler **ESP32** dengan ekosistem web *Full-Stack* (**Node.js + Express + React.js**) untuk memantau parameter lingkungan serta performa daya listrik secara *real-time*.

Selain pemantauan, proyek ini memiliki fitur kendali jarak jauh untuk mengaktifkan aktuator (**Kipas Pendingin** dan **Lampu**) melalui dua mode operasi: **Otomatis** (berdasarkan nilai ambang batas sensor) dan **Manual** (kendali penuh langsung dari halaman web).

---

## ✨ Fitur Utama Sistem

* 📊 **Dashboard Overview Dinamis:** Tampilan visual interaktif yang merangkum nilai suhu, kelembapan, intensitas cahaya, dan total daya listrik saat ini, lengkap dengan grafik tren *real-time* per 2 detik (menggunakan `Recharts`).
* 📝 **Sensor Log Terintegrasi:** Halaman khusus berbentuk tabel riwayat data sensor (*historical tracking*) yang tersinkronisasi langsung dengan grafik data untuk memudahkan proses audit data sensor.
* 🎛️ **Dual-Mode Device Control:**
    * **Mode Otomatis:** Sistem mengunci kontrol manual web, lalu mengeksekusi kontrol perangkat secara mandiri. Kipas menyala otomatis jika suhu ruangan $\ge 30^\circ C$. Lampu menyala otomatis jika intensitas cahaya sekitar gelap ($LDR \ge 1100$).
    * **Mode Manual:** Pengguna memiliki kendali penuh secara *real-time* untuk menghidupkan atau mematikan relay lampu dan kipas melalui tombol interaktif di dashboard web.
* ⚡ **Dynamic Power Monitoring Simulation:** Menampilkan kalkulasi Tegangan (V), Arus (mA), Daya (W), serta **Efisiensi Transfer Sistem** secara fluktuatif dan logis sesuai dengan status perangkat aktif untuk keperluan demonstrasi dan presentasi akademik yang memukau.

---

## 🛠️ Spesifikasi Perangkat Keras & Pinout

| Nama Komponen | Tipe / Spesifikasi | Pin ESP32 | Deskripsi Fungsi |
| :--- | :--- | :--- | :--- |
| **Mikrokontroler** | NodeMCU ESP32 (38 Pin) | Utama | Otak pemrosesan lokal & modul Wi-Fi |
| **Sensor Suhu & Hum** | DHT22 / AM2302 | `GPIO 4` | Membaca suhu ruangan dan kelembapan udara |
| **Sensor Cahaya** | LDR (Light Dependent Resistor) | `GPIO 34` | Membaca parameter intensitas cahaya (Analog) |
| **Modul LCD Display** | LCD 16x2 + I2C Backpack | `GPIO 21 (SDA)` / `GPIO 22 (SCL)` | Menampilkan status data lokal secara fisik |
| **Modul Sensor Daya** | 2x INA219 (Alamat `0x40` & `0x41`) | `GPIO 21 (SDA)` / `GPIO 22 (SCL)` | Meteran pengukur parameter daya (V, mA, mW) |
| **Modul Aktuator** | Relay 2-Channel (Active Low) | `GPIO 26` (Kipas) / `GPIO 27` (Lampu) | Sakelar elektronik untuk beban arus AC/DC |
| **Sistem Energi** | Panel Surya 10WP, SCC, Aki 12V | Jalur Kelistrikan | Sumber suplai daya mandiri untuk beban perangkat |

---

## 💻 Arsitektur Teknologi (Tech Stack)

### 1. Frontend (Web Interface)
* **React.js (Vite):** Menyediakan struktur aplikasi SPA (*Single Page Application*) yang cepat dan responsif.
* **Tailwind CSS (v4):** Framework CSS modern untuk penataan komponen UI profesional mirip dengan standar dasbor industri.
* **Recharts & Lucide React:** Library grafik performa tinggi untuk visualisasi tren data dan aset ikonasi antarmuka.

### 2. Backend (REST API Server)
* **Node.js & Express.js:** Server ringan yang menangani pertukaran data dari perangkat keras ke antarmuka web melalui rute HTTP.
* **Cors:** Middleware pengaman agar aplikasi frontend dapat mengakses data API lintas port dengan aman.

### 3. Perangkat Keras (Firmware)
* **C++ (Arduino IDE):** Pemrograman lokal ESP32 dengan pustaka utama `ArduinoJson` untuk penataan struktur objek data serta `HTTPClient` untuk komunikasi jaringan.

---

## 🚀 Panduan Instalasi & Penggunaan

### Langkah 1: Persiapan Server Backend
1.  Buka terminal baru, masuk ke direktori backend:
    ```bash
    cd backend
    ```
2.  Pasang pustaka dependensi yang dibutuhkan:
    ```bash
    npm install express cors dotenv
    ```
3.  Jalankan server backend (Server berjalan pada port `3000` secara default):
    ```bash
    node server.js
    ```

### Langkah 2: Persiapan Antarmuka Frontend
1.  Buka terminal baru, masuk ke direktori frontend:
    ```bash
    cd frontend
    ```
2.  Pasang seluruh modul *node_modules* yang terdaftar:
    ```bash
    npm install
    ```
3.  Pastikan plugin `@tailwindcss/vite` sudah dikonfigurasi di `vite.config.js`.
4.  Jalankan server lokal pengembangan frontend:
    ```bash
    npm run dev
    ```
5.  Buka tautan lokal yang disediakan oleh Vite (biasanya `http://localhost:5173`) di peramban web (*browser*).

### Langkah 3: Konfigurasi & Upload Firmware ESP32
1.  Buka aplikasi **Arduino IDE**.
2.  Pastikan Anda telah mengunduh library berikut lewat Library Manager:
    * `ArduinoJson`
    * `Adafruit INA219`
    * `DHT sensor library`
    * `LiquidCrystal I2C`
3.  Buka kode program berkas `.ino` milik alat.
4.  Sesuaikan nama jaringan Wi-Fi, kata sandi, dan IP lokal laptop Anda di baris konfigurasi atas:
    ```cpp
    const char* ssid = "e-UnimalNet";
    const char* password = "unimalnet";
    const char* serverURL = "[http://10.25.2.193:3000/api](http://10.25.2.193:3000/api)"; // Sesuaikan IP Laptop Anda
    ```
5.  Pilih papan pengembangan (*Board*) **ESP32 Dev Module**, hubungkan perangkat menggunakan kabel USB, lalu klik tombol **Upload**.

---

## 📡 Referensi Rute API (Endpoints Reference)

| HTTP Method | Endpoint Rute | Fungsi Utama | Target Perangkat |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/api/system` | Mengambil semua objek status sensor dan kelistrikan terbaru | Frontend React |
| **`POST`** | `/api/control` | Memperbarui parameter mode (Auto/Manual) serta status relay aktif | Frontend React |
| **`GET`** | `/api/devices/status` | Sinkronisasi berkala untuk membaca konfigurasi mode dan relay web | ESP32 Hardware |
| **`POST`** | `/api/environment` | Mengirimkan data terbaru dari sensor DHT22 dan LDR ke pangkalan data | ESP32 Hardware |
| **`POST`** | `/api/power` | Mengirimkan parameter kalkulasi kelistrikan dari modul pengukur daya | ESP32 Hardware |

---

## 📝 Catatan Tambahan Pengujian Alat
Untuk mempermudah proses jalannya demonstrasi sistem tanpa terkendala hambatan arus sirkuit pendek atau keterbatasan efisiensi perangkat keras, sistem *firmware* alat ini telah dikonfigurasi menggunakan metode **Dynamic Power Data Manipulation**. Arus beban murni dialirkan langsung dari Aki 12V ke rangkaian Relay (*Bypass* INA219), sementara data kelistrikan yang tampil pada visualisasi web dihasilkan secara cerdas dan responsif oleh mikrokontroler mengikuti status riil perangkat keras yang menyala.

---

```text
Distributed under Academic Research Standards for Universitas Malikussaleh.
Made with ❤️, ☕, and Clean Code Architecture.
