// Memanggil MySQL library yang diperlukan
const mysql = require('mysql');

// Variabel koneksi database
const db = mysql.createConnection({
  host: 'localhost',  // Alamat host database (biasanya 'localhost' jika database berjalan di mesin lokal)
  user: 'root',       // Nama pengguna database
  password: '',       // Kata sandi pengguna database (dalam contoh ini, password kosong)
  database: 'db_penjualan'  // Nama database yang akan digunakan (misalnya, 'db_penjualan')
});

// Ekspor variabel koneksi database untuk digunakan di modul lain
module.exports = db;
