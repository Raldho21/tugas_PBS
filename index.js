// Memanggil library Express untuk membuat aplikasi server
const express = require('express');

// Memanggil library bodyParser untuk membantu dalam mengelola data yang dikirimkan oleh klien
const bodyParser = require('body-parser');

// Memanggil konfigurasi database dari file config.js
const db = require('./config.js');

// Membuat aplikasi Express
const app = express();

// Menetapkan nomor port yang akan digunakan oleh server
const port = 3002;

// Memanggil fungsi response yang berisi konfigurasi untuk menangani respons HTTP
const response = require('./request.js');

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Definisi endpoint POST '/produk' untuk menambahkan data produk baru
app.post("/produk", (req, res) => {
  // Mendapatkan data produk dari badan permintaan (request body)
  const { nama_produk, harga } = req.body;

  // Query SQL untuk menambahkan data produk baru ke dalam tabel Produk
  const sql = `INSERT INTO Produk (nama_produk, harga) 
               VALUES ('${nama_produk}', ${harga})`;

  // Melakukan kueri ke database
  db.query(sql, (error, fields) => {
      if (error) {
          // Jika terjadi kesalahan, kirim respons dengan status 500 dan pesan kesalahan
          response(500, null, `Error: ${error.message}`, res);
      } else if (fields?.affectedRows) {
          // Jika data berhasil ditambahkan, kirim respons dengan status 200 dan pesan sukses
          const data = {
              isSuccess: fields.affectedRows,
              id: fields.insertId,
          };
          response(200, data, "Data produk berhasil disimpan", res);
      }
  });
});

// Definisi endpoint POST '/pelanggan' untuk menambahkan data pelanggan baru
app.post("/pelanggan", (req, res) => {
  // Mendapatkan data pelanggan dari badan permintaan (request body)
  const { nama_pelanggan, alamat } = req.body;

  // Query SQL untuk menambahkan data pelanggan baru ke dalam tabel Pelanggan
  const sql = `INSERT INTO Pelanggan (nama_pelanggan, alamat) 
               VALUES ('${nama_pelanggan}', '${alamat}')`;

  // Melakukan kueri ke database
  db.query(sql, (error, fields) => {
      if (error) {
          // Jika terjadi kesalahan, kirim respons dengan status 500 dan pesan kesalahan
          response(500, null, `Error: ${error.message}`, res);
      } else if (fields?.affectedRows) {
          // Jika data berhasil ditambahkan, kirim respons dengan status 200 dan pesan sukses
          const data = {
              isSuccess: fields.affectedRows,
              id: fields.insertId,
          };
          response(200, data, "Data pelanggan berhasil disimpan", res);
      }
  });
});

// Add a route to handle GET requests for fetching data
app.get('/produk', (req, res) => {
    // Query SQL untuk mengambil semua data dari tabel Produk
    const sql = 'SELECT * FROM Produk';

    // Melakukan kueri ke database
    db.query(sql, (error, result) => {
        if (error) {
            // Jika terjadi kesalahan, kirim respons dengan status 500 dan pesan kesalahan
            response(500, null, `Error: ${error.message}`, res);
        } else {
            // Jika kueri berhasil dieksekusi, kirim respons dengan status 200 dan data produk
            response(200, result, 'Data produk berhasil diambil', res);
        }
    });
});

// Add a route to handle GET requests for fetching data
app.get('/pelanggan', (req, res) => {
    // Query SQL untuk mengambil semua data dari tabel Pelanggan
    const sql = 'SELECT * FROM Pelanggan';

    // Melakukan kueri ke database
    db.query(sql, (error, result) => {
        if (error) {
            // Jika terjadi kesalahan, kirim respons dengan status 500 dan pesan kesalahan
            response(500, null, `Error: ${error.message}`, res);
        } else {
            // Jika kueri berhasil dieksekusi, kirim respons dengan status 200 dan data pelanggan
            response(200, result, 'Data pelanggan berhasil diambil', res);
        }
    });
});

// Add a route to handle GET requests for fetching data transaksi
app.get('/transaksi', (req, res) => {
  // Query SQL untuk mengambil semua data dari tabel Transaksi
  const sql = 'SELECT * FROM Transaksi';

  // Melakukan kueri ke database
  db.query(sql, (error, result) => {
      if (error) {
          // Jika terjadi kesalahan, kirim respons dengan status 500 dan pesan kesalahan
          response(500, null, `Error: ${error.message}`, res);
      } else {
          // Jika kueri berhasil dieksekusi, kirim respons dengan status 200 dan data transaksi
          response(200, result, 'Data transaksi berhasil diambil', res);
      }
  });
});

// Definisi endpoint POST '/transaksi' untuk menambahkan data transaksi baru
app.post("/transaksi", (req, res) => {
    // Mendapatkan data transaksi dari badan permintaan (request body)
    const { id_produk, id_pelanggan, tanggal_transaksi, jumlah_produk } = req.body;

    // Query SQL untuk menambahkan data transaksi baru ke dalam tabel Transaksi
    const sql = `INSERT INTO Transaksi (id_produk, id_pelanggan, tanggal_transaksi, jumlah_produk) 
                 VALUES (${id_produk}, ${id_pelanggan}, '${tanggal_transaksi}', ${jumlah_produk})`;

    // Melakukan kueri ke database
    db.query(sql, (error, fields) => {
        if (error) {
            // Jika terjadi kesalahan, kirim respons dengan status 500 dan pesan kesalahan
            response(500, null, `Error: ${error.message}`, res);
        } else if (fields?.affectedRows) {
            // Jika data berhasil ditambahkan, kirim respons dengan status 200 dan pesan sukses
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            };
            response(200, data, "Transaksi berhasil disimpan", res);
        }
    });
});

// Mendengarkan permintaan pada port yang ditetapkan
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
