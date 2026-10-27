# Raffli — Personal Portfolio & Project Case Studies

Portofolio digital **Al-man Raffli Saputra**, lulusan D3 Teknik Komputer Politeknik Negeri Sriwijaya, untuk memperkenalkan karya web development, data analytics, desain, serta pengalaman organisasi dan profesional.

Bukan hanya kumpulan tangkapan layar: setiap proyek disajikan sebagai **case study** yang menjelaskan masalah yang ditangani, pendekatan teknis, teknologi yang dipakai, serta hasil yang dapat ditelusuri melalui demo maupun repository.

## Pengalaman di website

- **Landing interaktif**: profil, keahlian, pengalaman, karya, sertifikat, dan kontak.
- **Project showcase**: carousel karya dengan informasi teknologi pada setiap kartu dan halaman `/projects` untuk seluruh proyek.
- **Halaman detail dinamis**: `/projects/[slug]` menyajikan cerita proyek, implementasi, hasil, galeri dan tautan kode sumber.
- **Galeri lightbox**: gambar dapat diperbesar dan ditelusuri menggunakan tombol navigasi atau keyboard.
- **Bahasa Indonesia & Inggris**: pilihan bahasa tersimpan di browser; konten proyek yang ditulis dalam Bahasa Indonesia dapat diterjemahkan saat diperlukan.
- **Interaksi visual**: Three.js, Framer Motion, Lottie, dan komponen carousel.

## Teknologi yang digunakan

| Lapisan | Teknologi |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Bahasa | TypeScript, JavaScript |
| Tampilan | CSS, Tailwind CSS 4 |
| Animasi / 3D | Framer Motion, Three.js, Lottie |
| Konten proyek | `data/projectsData.ts` |
| Bahasa | React context, `/api/translate` dan API penerjemah opsional |
| Deployment | Vercel |

## Konsep dan hasil

Portofolio ini dirancang agar pembaca bisa mengevaluasi **apa yang dibangun, mengapa teknologi tersebut dipilih, dan bukti hasil pengerjaannya**. Artikel proyek menggunakan narasi berbasis kode sumber dan dokumentasi; klaim statistik yang tidak terverifikasi dihindari.

Konten studi kasus berpusat pada `data/projectsData.ts`. Untuk menambahkan karya, cukup membuat satu entri berbahasa Indonesia, menyertakan galeri, dan mencantumkan demo atau sumbernya. Dokumentasi pengelolaan konten dan penerjemahan: [PROJECT_CONTENT_AND_TRANSLATION.md](docs/PROJECT_CONTENT_AND_TRANSLATION.md).

## Jelajahi

- [Seluruh proyek](https://github.com/Darren0099/Raffli-dev/tree/main/data)
- [Profil GitHub](https://github.com/Darren0099)

> Beberapa tampilan dan integrasi eksternal bergantung pada layanan pihak ketiga. Repository ini adalah sumber portofolio, bukan CMS multi-pengguna.
