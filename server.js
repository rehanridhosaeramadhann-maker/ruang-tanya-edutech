const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));
app.post('/api/chat', (req, res) => {
  try {
    const pesanUser = req.body && req.body.pesan ? req.body.pesan : "";
    if (!pesanUser) return res.json({ jawaban: "Halo! Ada yang bisa saya bantu hari ini?" });

    const teks = pesanUser.toLowerCase();
    let jawaban = "";

    // 1. JAWABAN UNTUK PERTANYAAN PILIHAN JURUSAN / SEKOLAH
    if (teks.includes("sma") || teks.includes("smk")) {
      jawaban = "Bedanya, SMA lebih fokus ke teori umum untuk persiapan lanjut kuliah. Kalau SMK lebih banyak praktik kejuruan agar kamu siap langsung kerja setelah lulus. Keduanya punya keunggulan masing-masing!";
    } 
    else if (teks.includes("saintek") || teks.includes("soshum") || teks.includes("jurusan")) {
      jawaban = "Saintek fokus ke ilmu alam dan teknologi (seperti IT, Teknik, Kedokteran). Sedangkan Soshum fokus ke ilmu sosial dan humaniora (seperti Hukum, Akuntansi, Manajemen, Psikologi). Pilih yang sesuai minatmu ya!";
    } 
    else if (teks.includes("it") || teks.includes("komputer") || teks.includes("informatika") || teks.includes("coding")) {
      jawaban = "Untuk masuk jurusan Ilmu Komputer atau IT, hal penting yang perlu kamu kuasai adalah logika matematika dasar, algoritma sederhana, dan konsistensi belajar coding. Prospek kerjanya sangat luas di era digital!";
    } 
    else if (teks.includes("bingung") || teks.includes("pilih") || teks.includes("kuliah")) {
      jawaban = "Tips mengatasi bingung pilih jurusan: 1. Kenali minat bakatmu, 2. Riset prospek kerja masa depan, 3. Diskusikan dengan orang tua atau guru, 4. Ikut trial class di platform edutech Kelompok 5.";
    }

    // 2. JAWABAN UNTUK PERTANYAAN UMUM / RANDOM
    else if (teks.includes("halo") || teks.includes("hai") || teks.includes("pagi") || teks.includes("siang")) {
      jawaban = "Halo juga! Selamat datang di Ruang Tanya Kelompok 5. Ada yang bisa saya bantu seputar info jurusan kuliah atau perbandingan sekolah?";
    } 
    else if (teks.includes("siapa") || teks.includes("buat") || teks.includes("kelompok")) {
      jawaban = "Aku adalah chatbot pintar Ruang Tanya yang dibuat khusus oleh Kelompok 5 Kewirausahaan untuk membantu kamu menemukan jalan masa depanmu!";
    } 
    else if (teks.includes("makasih") || teks.includes("terima kasih") || teks.includes("oke")) {
      jawaban = "Sama-sama! Senang bisa membantumu. Semangat terus ya belajarnya!";
    } 

    // 3. JAWABAN PINTAR JIKA USER BERTANYA HAL LAIN (DIJAMIN TETAP NYAMBUNG)
    else {
      jawaban = `Pertanyaanmu tentang "${pesanUser}" menarik sekali! Di era digital ini, topik tersebut bisa kamu eksplorasi lebih dalam lewat artikel edukasi atau diskusi seru dengan mentor di platform edutech Kelompok 5. Ada info jurusan atau sekolah lain yang mau kamu tanyakan?`;
    }

    res.json({ jawaban: jawaban });

  } catch (error) {
    res.json({ jawaban: "Halo! Ada yang bisa dibantu tentang info jurusan kuliah?" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Super Aman berjalan sukses di http://localhost:${PORT}`));