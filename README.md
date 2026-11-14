# Natan Waine Portfolio

Portfolio static untuk Natan Waine: Desain Grafis, Brand Identity, IT Konsultan, dan Web Developer.

## Menjalankan

Buka `index.html` langsung di browser. Tidak membutuhkan build tool atau server.

## Mengubah isi

- **Foto profil:** ganti berkas `Asset/natan.png` atau ubah URL `src` pada elemen `#profile-image` di `index.html`.
- **Karya, foto, dan tautan:** edit array `portfolioData.projects` di `data.js`. Gunakan path lokal di folder `Asset` untuk dokumentasi karya atau alamat website asli untuk tautan.
- **Artikel:** edit array `portfolioData.articles` di `data.js`.
- **Sertifikat:** edit array `portfolioData.certificates` di `data.js`. File PDF di `Asset/Sertifikat` sudah dirender menjadi JPG bernama ringkas per halaman dengan pola `judul-tahun-hal-01.jpg`, `judul-tahun-hal-02.jpg`, dan seterusnya; gunakan JPG sebagai gambar sertifikat di situs. File PDF sumber tetap disimpan.
- **Media sosial, email, dan WhatsApp:** cari tautan terkait di bagian contact pada `index.html`.
- **Warna dan ukuran:** variabel utama tersedia di bagian atas `styles.css`.

Foto dan dokumentasi portofolio menggunakan aset lokal dari folder `Asset`. Dua contoh proyek Kaido sementara memakai `Asset/sert.jpg` dan tautan `https://www.kaido.com`; ganti gambarnya ketika dokumentasi proyek final sudah tersedia.
