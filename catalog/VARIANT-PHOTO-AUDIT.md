# Audit kecocokan foto varian eljab.id

Tanggal: 7 November 2026 (Asia/Jakarta).

Seluruh 27 produk, 468 varian aktif dan 21 pilihan lama diperiksa. Foto asli tidak diubah atau diwarnai ulang. Harga, nama varian dan isi pesanan tetap mengikuti snapshot yang disetujui.

## Aturan foto

- Saat warna dipilih, hanya foto tunggal yang sudah diperiksa untuk produk dan varian tersebut yang boleh tampil.
- Foto model umum dan poster gabungan tidak dimasukkan ke galeri atau zoom varian.
- Jika foto tidak tersedia, meragukan, bertentangan dengan label, gagal dimuat, atau ID varian tidak dikenal, tampilkan keterangan foto belum tersedia; jangan mengganti dengan warna lain.
- Swatch tanpa foto terverifikasi memakai pola netral, bukan perkiraan warna dari foto yang meragukan. Nama pilihan tetap tersedia pada selector.
- Pilihan lama tetap dapat dipesan sesuai nama tersimpan, tetapi fotonya disembunyikan sampai diperiksa ulang.
- Filter warna dan pencarian harus cocok pada varian yang sama.
- Kartu tanpa pilihan warna tetap boleh menampilkan foto koleksi dengan keterangan umum.

## Hasil pemeriksaan visual

| Produk | Foto sesuai | Foto disembunyikan | Pilihan lama tanpa foto |
|---|---:|---:|---:|
| modal-viscose | 32 | 0 | 1 |
| viscose-gradasi | 12 | 0 | 0 |
| paris-legend | 57 | 8 | 1 |
| airtech-ultrasoft | 8 | 0 | 1 |
| gana-instan | 24 | 0 | 1 |
| printed-viscose | 18 | 12 | 3 |
| motif-tryspan | 20 | 62 | 1 |
| bamboo-spandex | 20 | 0 | 1 |
| zoya-instan | 12 | 1 | 1 |
| bamboo-slip-on | 19 | 0 | 1 |
| paris-japan | 20 | 1 | 1 |
| hawa-instan | 20 | 0 | 1 |
| viscose-highlight | 14 | 0 | 1 |
| aisha-khiban | 20 | 0 | 1 |
| hayla-khiban | 18 | 0 | 1 |
| mukena-armani | 21 | 12 | 1 |
| mukena-segenggam-polos | 6 | 0 | 1 |
| mukena-segenggam-lily | 0 | 4 | 1 |
| mukena-rayon-viscose | 0 | 5 | 1 |
| hampers-soft-box | 1 | 0 | 0 |
| lea-oval-khiban | 2 | 0 | 0 |
| zea-sport-instan | 2 | 0 | 0 |
| inner-tali | 0 | 0 | 0 |
| armani-polka | 7 | 0 | 1 |
| armani-lasercut | 0 | 0 | 0 |
| armani-panel-printing | 0 | 0 | 0 |
| mukena-armani-ori | 6 | 4 | 0 |
| **Total** | **359** | **109** | **21** |

106 foto varian berupa poster gabungan disembunyikan. Tiga foto lain disembunyikan karena hasil pemeriksaan berikut:

- Paris Legend / White: kain tampak ungu sehingga foto tidak dapat dipastikan mewakili putih.
- Paris Japan / Granola: foto bertuliskan Charcoal.
- Zoya Instan / Black: foto bertuliskan Smoke.

## Bukti dan pemeliharaan

`variant-photo-audit.json` mencatat keputusan, alasan, nama aset dan SHA-256 foto sumber setiap varian, termasuk pilihan lama. `src/data/variant-photos.json` adalah daftar foto yang boleh ditampilkan. Perubahan nama, pemetaan gambar, varian baru atau produk baru tidak otomatis masuk daftar ini.

Kriteria pemeriksaan ulang: telusuri pilihan dari kartu, filter dan tautan ke detail, galeri/zoom, tas dan draft WhatsApp. Foto harus cocok dengan nama pilihan di setiap tahap; tanpa bukti yang cukup, sembunyikan foto.

Lembar kontak lokal untuk pemeriksaan seluruh aset tersimpan di `qa/color-review/` dan hasil browser lokal di `qa/color-ui/` (diabaikan Git). Pemeriksaan gambar responsif membandingkan 1.077 turunan terhadap 359 foto utama; seluruhnya cocok, selisih rata-rata kanal maksimum 0,791 dari 255.
