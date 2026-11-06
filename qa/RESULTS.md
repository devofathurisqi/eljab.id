# Verifikasi eljab.id

## Revisi klien — 6 November 2026

- Tiga ilustrasi botani SVG asli (10.647 byte total): rangkaian mawar, tangkai bunga kecil, dan ornamen memanjang. Nuansa dusty rose, ivory, dan sage mengikuti palet krem/emas dan bentuk bunga pada logo. Diterapkan pada hero, bingkai identitas melengkung, katalog/tersimpan, kontak, dan footer.
- Seluruh tujuan WhatsApp dan nomor yang ditampilkan diperbarui menjadi **6282241183864 / +62 822-4118-3864**, termasuk kontak, order langsung produk, dan checkout tas.
- `npm test`: **21/21 lulus**. Assertion tujuan WhatsApp memakai nomor literal terbaru; snapshot 27 produk dan 468 varian tetap sesuai.
- `npm run build`: TypeScript, Vite, prarender **33 halaman**, serta pemeriksaan **182 aset/tautan lokal** lulus.
- Browser lokal: **35 kombinasi halaman/viewport** pada 360, 390, 768, 1366, dan 1920 px. Halaman beranda, katalog, cerita, detail Gana Instan, panduan, tersimpan, dan tas tidak mengalami overflow horizontal atau gambar rusak. Semua tautan WhatsApp menuju nomor baru. Ilustrasi dekoratif memiliki alt kosong, aria-hidden, dan pointer-events none.
- Enam pemeriksaan interaksi lulus: pilihan Baby Pink di hero, menu mobile, pencarian katalog, tautan order langsung, penambahan ke tas, serta nomor tujuan dan varian Baby Pink pada draft checkout WhatsApp. Tidak ada error console/runtime atau pesan yang dikirim.
- Tampilan desktop dan ponsel ditinjau melalui screenshot lokal, termasuk detail hero, bingkai identitas, kontak, dan footer. Seluruh validasi dilakukan sebelum push. Sesuai instruksi pengguna, pekerjaan berhenti setelah push berhasil tanpa pemeriksaan deploy.

## Riwayat verifikasi awal

3 November 2026, Asia/Jakarta.

## Hasil

- 21/21 tes unit lulus. Meliputi 468 varian, seluruh aset foto/responsive derivative, harga brand/retail/konfirmasi, sanitasi keranjang, alias produk, legacy varian, penggabungan warna sama, pemisahan warna berbeda, batas jumlah, subtotal, pesan WhatsApp, dan kecocokan snapshot katalog. Nomor tujuan dan namespace penyimpanan diuji terhadap nilai literal yang diberikan pengguna.
- TypeScript dan build produksi lulus; 33 halaman diprarender. Verifier memeriksa aset lokal, route, schema Product, brand, tujuan WhatsApp, 404, serta tidak adanya dokumen atau field harga internal.
- Pengujian browser melalui in-app browser: home, katalog dan detail Gana pada 360, 390, 768, 1366, 1920 px. 15 kombinasi per toko, 45 total; tidak ada overflow horizontal atau gambar rusak yang terdeteksi.
- Interaksi mobile 390 px: pencarian Zea menghasilkan satu koleksi; kategori Hijab Instan lima koleksi; filter Pink / maksimum Rp75.000 dan urutan harga terendah; pencarian navbar Paris Japan; menu mobile menuju cerita brand.
- Galeri: memilih Black, membuka contoh pemakaian, memastikan warna pesanan tetap Black, membuka/menutup zoom. Inner Tali mempertahankan alur konfirmasi foto tanpa varian rekaan.
- Keranjang browser: Baby Pink 2 pcs = Rp112.000; naik ke 3 pcs = Rp168.000; tambah Black 1 pcs = dua baris varian / 4 pcs / Rp224.000. Pilihan tetap setelah reload. Draft WhatsApp berisi varian, jumlah, subtotal, catatan dengan karakter & yang ter-encode, dan tujuan **6281336697504**. Tidak ada pesan dikirim. Item pengujian dihapus melalui UI setelah tes.
- Favorit Gana disimpan dan muncul di halaman tersimpan.

## Desain dan performa

Logo asli digunakan. Navbar #e0dcd1; ARMIÉ mempertahankan É. eljab.id memakai penyaringan alpha SVG atas gambar asli untuk menghilangkan latar bertekstur pada logo kecil tanpa menggambar ulang bentuknya. Komposisi halaman utama setiap brand berbeda. Perbaikan hasil QA mencakup judul ARMIÉ mobile dan batas selector foto/caption.

Font Cormorant Garamond dan DM Sans lokal dalam WOFF2: unduhan awal sekitar 75 KB, turun dari sekitar 339 KB TTF. Gambar WebP responsif, lazy loading di bawah fold, dan thumbnail kecil dipakai pada galeri/tas. Entry JS sekitar 113 KB gzip, CSS sekitar 8–9 KB gzip. Angka ini ukuran build, bukan skor Lighthouse atau pengukuran jaringan produksi.

## Batas data dan hosting

27 produk dan semua harga persis mengikuti snapshot Sugarshawl lokal. Enam produk tetap memerlukan konfirmasi harga; tiga memerlukan foto/warna. Stok, ongkir, total akhir dan pembayaran dikonfirmasi penjual. Paket 150 tidak memiliki dashboard.

Target GitHub: https://github.com/devofathurisqi/eljab.id/tree/prod. Domain hosting belum ditentukan. Set SITE_URL di hosting yang benar untuk canonical/sitemap; tidak ada domain rekaan.
