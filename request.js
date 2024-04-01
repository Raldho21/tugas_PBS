// Fungsi 'response' untuk menghasilkan respons HTTP dengan struktur yang telah ditentukan
const response = (statusCode, data, message, res) => {
    // Mengatur status kode HTTP dan mengirim respons dalam format JSON
    res.status(statusCode).json({
        // Bagian 'payload' berisi data utama yang ingin dikirim
        payload: {
            status_code: statusCode, // Status kode HTTP yang digunakan
            data: data, // Data yang ingin dikirim (misalnya, hasil kueri database)
        },
        // Pesan yang ingin disertakan dalam respons (biasanya deskripsi singkat)
        message: message,
        // Informasi paginasi, seperti tautan halaman sebelumnya dan berikutnya
        pagination: {
            prev: '', // Tautan ke halaman sebelumnya (dapat diisi dengan URL)
            next: '', // Tautan ke halaman berikutnya (dapat diisi dengan URL)
            max: 10 // Jumlah maksimum item per halaman (dapat diubah sesuai kebutuhan)
        }
    });
};

// Ekspor fungsi 'response' agar dapat digunakan di modul lain
module.exports = response;
