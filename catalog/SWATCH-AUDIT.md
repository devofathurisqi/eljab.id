# Audit warna tombol eljab.id

7 November 2026 (Asia/Jakarta), setelah laporan customer tentang Paris Legend / Beet Red.

Foto Beet Red sudah sesuai dengan nama varian, tetapi warna tombol sebelumnya `#bbb19e` berasal dari latar foto. Audit foto saja tidak cukup untuk membuktikan kecocokan warna tombol. Area sampel lama memakai posisi yang sama untuk berbagai komposisi foto, dan sebagian pilihan masih memakai warna perkiraan.

## Perbaikan

- Warna tombol hanya berasal dari area kain yang diperiksa pada foto varian yang sama. Median RGB dihitung dari kotak tersebut; foto tidak diedit atau diwarnai ulang.
- **268 varian** mempunyai sampel kain yang diperiksa. **200 varian aktif** dan **21 pilihan lama** memakai pola netral karena tidak mempunyai sampel tunggal yang sesuai. Ini mencakup foto yang disembunyikan, motif, gradasi, serta kemasan.
- Nama varian dan foto tetap menjadi acuan untuk pilihan bermotif/gradasi. Pola netral tidak dimaksudkan sebagai warna abu-abu produk; keterangannya ditampilkan dekat pilihan varian.
- `variantSwatch()` membaca `swatchHex` dari daftar foto yang sudah diperiksa. Tidak ada fallback ke `Variant.hex` lama. Foto, nama, atau ID yang berubah harus diperiksa ulang sebelum bisa mempunyai tombol berwarna.
- Kartu katalog dan detail memakai komponen `VariantSwatch` yang sama. Pilihan pada hero juga memakai `variantSwatch()`.
- Snapshot produk, nama pilihan, harga, serta foto asli tetap utuh. Warna lama dipertahankan hanya sebagai metadata historis dan bukti perbandingan.

| Pilihan | Tombol lama | Sampel kain baru |
|---|---|---|
| Paris Legend / Beet Red | `#bbb19e` | `#771830` |
| Paris Legend / Soft Pink | `#b5a08d` | `#bf8d89` |
| Paris Legend / Abalone | `#cfbeb3` | `#c7abb2` |
| Gana Instan / Biscuit | `#c8c3ba` | `#e0dde0` |
| Gana Instan / Baby Pink | `#d0a5b1` | `#e1d5db` |

## Bukti dan pemeriksaan

`swatch-audit.json` mencatat keputusan setiap pilihan, warna sebelumnya, foto sumber, SHA-256, dimensi, koordinat kotak kain, serta warna hasil sampel. Untuk keputusan netral, alasan dicatat tanpa membuat warna perkiraan.

Setiap kotak sampel ditinjau pada lembar kontak lokal `qa/swatch-review/`, termasuk posisi kotak pada kain dan perbandingan warna lama/baru. Kotak yang mengenai latar, wajah, tulisan, atau bayangan lipatan yang terlalu gelap dipindahkan ke area kain yang lebih sesuai sebelum disetujui.

Validasi piksel lokal: `python scripts/verify-swatches.py` (memerlukan Pillow). Script hanya membaca sumber dan memverifikasi 268 hasil sampel, koordinat, dimensi dan hash; tidak mengubah file.

Tes regresi mencakup kasus Beet Red, warna kuat lain, penolakan fallback ke hex lama, seluruh keputusan warna/netral, dan gambar multiwarna. Pengujian browser membandingkan warna tombol aktual dengan area kain yang didekode melalui canvas, serta menelusuri pilihan ke foto dan tas belanja.

Kriteria pemeriksaan ulang: nama pilihan, warna tombol, dan kain pada foto harus menunjuk pilihan yang sama. Jika satu warna tidak bisa dipastikan, gunakan pola netral dan biarkan customer memilih berdasarkan nama/foto; jangan memakai latar foto atau warna perkiraan.
