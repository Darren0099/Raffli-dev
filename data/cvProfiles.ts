// Curated from the user's uploaded CV, public GitHub READMEs, portfolio and LinkedIn headline.
// Numeric statements describe documented project scope, never fabricated commercial impact.
export type CVLang = 'id' | 'en';
export type CVRole = 'general' | 'web' | 'data' | 'design' | 'hr';
export type CVPages = 1 | 2;
export type DualText = { id: string; en: string };
export type CVEntry = {
  title: DualText;
  organization: string;
  period: string;
  bullets: DualText[];
  url?: string;
};
export type CVSkill = { label: DualText; value: string | DualText };
export type CVProfile = {
  label: DualText;
  headline: DualText;
  summary: DualText;
  experience: CVEntry[];
  projects: CVEntry[];
  skills: CVSkill[];
  certificates: string[];
  highlights: DualText[];
};
export const cvText = (id: string, en: string): DualText => ({ id, en });
const t = cvText;
const entry = (title: DualText, organization: string, period: string, bullets: DualText[], url?: string): CVEntry => ({ title, organization, period, bullets, url });
const skill = (label: DualText, value: string | DualText): CVSkill => ({ label, value });

export const cvRoles: CVRole[] = ['general', 'web', 'data', 'design', 'hr'];

export const cvProfiles: Record<CVRole, CVProfile> = {
  general: {
    label: t('Umum / General', 'General / All-round'),
    headline: t('Lulusan D3 Teknik Komputer | Administrasi, Operasional & Digital', 'Computer Engineering Graduate | Operations, Administration & Digital'),
    summary: t(
      'Lulusan D3 Teknik Komputer Politeknik Negeri Sriwijaya (IPK 3,66) dengan pengalaman lintas bidang: pengembangan aplikasi web, pengelolaan konten dan komunikasi perusahaan, kepemimpinan HR, serta analisis data. Terbiasa bekerja dengan tim lintas fungsi, mengelola dokumentasi dan alur kerja, serta menerjemahkan kebutuhan menjadi solusi digital yang dapat digunakan.',
      'Diploma III Computer Engineering graduate from Sriwijaya State Polytechnic (GPA 3.66/4.00) with cross-functional experience in web development, corporate content administration, HR leadership, and data analysis. Experienced in team coordination, structured documentation, and converting operational needs into usable digital solutions.'
    ),
    experience: [
      entry(t('Ketua Human Resources — Distrik Sumatera 2', 'Head of Human Resources — Sumatera 2 District'),'Youth Ranger Indonesia','Jun 2025 – Jan 2026',[
        t('Mengoordinasikan 7 program HR, termasuk Talent System, HR Connect, Cultural Check-In, Weekly Pulse, Individual Log, RDC, dan HR Reward.','Coordinated 7 HR programs, including Talent System, HR Connect, Cultural Check-In, Weekly Pulse, Individual Log, RDC, and HR Reward.'),
        t('Mengelola dokumentasi evaluasi anggota, pemetaan talenta, dan laporan kinerja individu untuk mendukung tindak lanjut pengembangan tim.','Maintained member evaluation records, talent mapping, and individual performance logs to support team-development follow-up.'),
        t('Menjembatani komunikasi lintas regional antara pengurus distrik, pimpinan regional, dan tim HR agar kegiatan berjalan terkoordinasi.','Facilitated communication across district leaders, regional representatives, and HR members to coordinate people programs.')
      ]),
      entry(t('Magang Humas & Pengembangan Website', 'Public Relations & Web Development Intern'),'PLN Icon Plus SBU Sumbagsel','2025',[
        t('Mengembangkan portal publikasi artikel wilayah Bangka Belitung menggunakan PHP, MySQL, HTML, CSS, dan JavaScript.','Developed a Bangka Belitung article-publishing portal using PHP, MySQL, HTML, CSS, and JavaScript.'),
        t('Menyusun alur pengelolaan konten melalui dashboard admin untuk pembuatan, pembaruan, penghapusan artikel, dan penanganan media.','Implemented admin content workflows for creating, updating, and deleting articles and managing media.'),
        t('Mendukung kebutuhan komunikasi digital melalui pengelompokan artikel, fitur pencarian, dan tampilan responsif.','Supported digital communications through article categorization, search, and responsive public-facing pages.')
      ],'https://github.com/Darren0099/plniconnetbangkabelitung'),
      entry(t('Koordinator Desain & Komunikasi Visual', 'Graphic Design & Visual Communications Coordinator'),'Youth Ranger Indonesia Sumatera Selatan','2023 – 2024',[
        t('Mengoordinasikan produksi materi visual dan kebutuhan publikasi kegiatan komunitas secara kolaboratif.','Coordinated production of visual materials and event publications with community teams.'),
        t('Membuat poster, banner, sertifikat, konten edukasi Instagram, dan sampul proposal sesuai identitas organisasi.','Produced posters, banners, certificates, Instagram educational content, and proposal covers aligned with organizational identity.'),
        t('Membantu menjaga konsistensi identitas visual serta menyelaraskan kebutuhan tim desain, publikasi, dan dokumentasi.','Helped maintain visual consistency while coordinating design, publication, and documentation requirements.')
      ])
    ],
    projects: [
      entry(t('YRI HRD — Sistem Penilaian Kandidat', 'YRI HRD — Candidate Evaluation Dashboard'),'Next.js · React · PostgreSQL · Drizzle ORM','2026',[
        t('Mengembangkan prototipe dashboard data kandidat dan pencatatan hasil wawancara dalam satu sistem.','Developed a prototype dashboard that centralizes candidate records and interview evaluations.'),
        t('Menyediakan 5 aspek penilaian, pemeringkatan kandidat, dan tampilan hasil per regional/divisi pada versi Next.js.','Implemented 5 scoring dimensions, candidate ranking, and regional/division views in the Next.js version.'),
        t('Membuat alur pelaporan Excel dan PDF untuk memudahkan peninjauan data seleksi; aturan penilaian versi prototipe belum menjadi kebijakan resmi.','Added Excel and PDF reporting; prototype scoring policies have not been validated as official HR policy.')
      ],'https://github.com/Darren0099/YRIHRD'),
      entry(t('Palembang Go Vacation — Portal Pariwisata', 'Palembang Go Vacation — Tourism Portal'),'KMIPN VI · Next.js · TypeScript','2024',[
        t('Berkontribusi membangun portal informasi yang mencakup 94 entri destinasi dalam 4 kategori wisata.','Contributed to a tourism portal cataloguing 94 destination entries across 4 categories.'),
        t('Menyajikan filter kategori, halaman detail dinamis, galeri, serta tautan lokasi Google Maps.','Implemented category filtering, dynamic destination pages, galleries, and Google Maps links.'),
        t('Menghubungkan 14 destinasi yang didukung ke sumber tur virtual 3D/360° untuk eksplorasi pengguna.','Connected 14 supported destinations to external 3D/360° virtual-tour resources.')
      ],'https://github.com/Darren0099/KMIPN6-EGOVERNEMNT'),
      entry(t('KleinData — Workspace Analitik Mandiri', 'KleinData — Self-service Analytics Workspace'),'SvelteKit · DuckDB-Wasm · Chart.js','2026',[
        t('Mengembangkan aplikasi impor dan eksplorasi data yang mendukung 5 format: CSV, TSV, JSON, XLSX, dan Parquet.','Built a data exploration application supporting 5 import formats: CSV, TSV, JSON, XLSX, and Parquet.'),
        t('Menyediakan 30 resep analisis SQL deskriptif beserta grafik dan tabel pendukung yang dapat diperiksa.','Implemented 30 descriptive SQL analysis recipes with traceable charts and supporting tables.'),
        t('Membuat fitur pemetaan kolom, pemeriksaan kualitas data, dan ekspor untuk membantu pengguna memahami dataset mentah.','Built column mapping, data-quality inspection, and export workflows to help users understand raw datasets.')
      ],'https://github.com/Darren0099/DataForge')
    ],
    skills: [
      skill(t('Administrasi & operasional', 'Administration & operations'),t('Dokumentasi, koordinasi tim, pelaporan, evaluasi','Documentation, team coordination, reporting, evaluation')),
      skill(t('Digital & pengembangan web', 'Digital & web development'),'HTML, CSS, JavaScript, React, Next.js, PHP, MySQL'),
      skill(t('Analisis & pengolahan data', 'Data analysis & processing'),'Excel, Python, SQL, Dashboard, Data Cleaning'),
      skill(t('Komunikasi & desain', 'Communications & design'),t('Figma, Canva, konten digital, komunikasi organisasi','Figma, Canva, digital content, organizational communication'))
    ],
    certificates: ['Data Analytics Essentials — Cisco Networking Academy','CSS Essentials — Cisco Networking Academy','IT Customer Support Basics — Cisco Networking Academy'],
    highlights: [
      t('IPK 3,66/4,00 — D3 Teknik Komputer, Politeknik Negeri Sriwijaya.', 'GPA 3.66/4.00 — Diploma III Computer Engineering, Sriwijaya State Polytechnic.'),
      t('Finalis KMIPN VI kategori e-Government (2024).','Finalist, KMIPN VI e-Government category (2024).')
    ]
  },
  web: {
    label: t('Frontend / Web Developer','Frontend / Web Developer'),
    headline: t('Frontend / Web Developer', 'Frontend / Web Developer'),
    summary: t('Lulusan D3 Teknik Komputer yang berfokus pada pengembangan website responsif, sistem pengelolaan konten, dan aplikasi web berbasis data. Memiliki pengalaman mengembangkan antarmuka dengan React, Next.js, SvelteKit, serta integrasi PHP/MySQL dan API. Mengutamakan antarmuka yang mudah digunakan dan alur kerja yang terstruktur.','Computer Engineering graduate focused on responsive websites, content management systems, and data-driven web apps. Hands-on with React, Next.js, SvelteKit, PHP/MySQL, and API integrations, prioritizing usable interfaces and reliable workflows.'),
    experience: [
      entry(t('Magang Humas — Pengembang Website Artikel', 'Corporate Communications Intern — Article Website Developer'),'PLN Icon Plus SBU Sumbagsel','2025',[
        t('Membangun portal berita dan artikel PLN Iconnet Bangka Belitung menggunakan PHP, MySQL, dan teknologi web dasar.','Built the PLN Iconnet Bangka Belitung news portal using PHP, MySQL, and core web technologies.'),
        t('Mengembangkan CMS admin untuk membuat, mengedit, menghapus, dan mengelola gambar artikel pada website.','Developed an admin CMS to create, edit, delete, and manage article images.'),
        t('Mengimplementasikan pencarian, filter kategori, dan antarmuka responsif untuk memudahkan navigasi konten.','Implemented search, category filters, and responsive UI for easier content navigation.')
      ],'https://github.com/Darren0099/plniconnetbangkabelitung'),
      entry(t('Pengembang Website Organisasi', 'Organization Website Developer'),'Youth Ranger Indonesia Sumatera Selatan','2024 – 2026',[
        t('Membangun website dengan Next.js, React, dan TypeScript untuk profil organisasi, program, berita, dan galeri.','Built a Next.js, React, and TypeScript website for organization profile, programs, news, and gallery.'),
        t('Merancang halaman berita dengan pencarian, filter kategori, halaman detail artikel, dan komponen galeri.','Created searchable news pages, category filters, article detail pages, and gallery components.'),
        t('Mengintegrasikan alur tambah, edit, dan hapus berita melalui GitHub API; publikasi bergantung izin token server.','Integrated add, edit, and delete news workflows via GitHub API, dependent on server token permissions.')
      ],'https://github.com/Darren0099/YOUTHRANGERINDONESIASUMATERASELATAN'),
      entry(t('Pengembang Website UMKM — Pengabdian Masyarakat', 'Community Web Developer — SME Digitalization'),'Politeknik Negeri Sriwijaya','2024 – 2025',[
        t('Membuat katalog promosi Dapur Ummi Kyana menggunakan HTML, CSS, dan JavaScript untuk memperkenalkan usaha kuliner.','Built a promotional Dapur Ummi Kyana catalog using HTML, CSS, and JavaScript.'),
        t('Menyusun tampilan menu, produk unggulan, dan informasi usaha dalam landing page yang responsif.','Created responsive sections for menu items, featured products, and business information.'),
        t('Berkolaborasi dalam kegiatan pengabdian dosen terkait penerapan website dan pemasaran digital pada UMKM.','Collaborated on a lecturer-led community initiative supporting SME website adoption and digital promotion.')
      ],'https://github.com/Darren0099/PENGABDIAN-MASYARAKAT-UMKM-DAPURUMMIKYANAPALEMBANG')
    ],
    projects: [
      entry(t('Palembang Go Vacation — Portal Wisata', 'Palembang Go Vacation — Tourism Portal'),'Next.js 15 · React 19 · TypeScript','2024',[
        t('Membangun portal destinasi wisata dengan 94 entri yang dikelompokkan ke dalam 4 kategori.','Built a tourism portal with 94 destinations organized in 4 categories.'),
        t('Menerapkan routing dinamis /wisata/[slug], filter, galeri lightbox, dan tautan lokasi.','Implemented /wisata/[slug] dynamic routing, filters, lightbox gallery, and location links.'),
        t('Menghubungkan 14 destinasi ke sumber tur virtual 3D/360°; konten tambahan memakai fallback jika belum lengkap.','Linked 14 supported destinations to 3D/360° virtual tours, with fallbacks for incomplete content.')
      ],'https://github.com/Darren0099/KMIPN6-EGOVERNEMNT'),
      entry(t('KleinData — Studio Insight', 'KleinData — Insight Studio'),'SvelteKit · TypeScript · DuckDB-Wasm','2026',[
        t('Membangun web analytics responsif yang mengolah CSV, TSV, JSON, XLSX, dan Parquet di browser.','Developed a responsive analytics app processing CSV, TSV, JSON, XLSX, and Parquet in the browser.'),
        t('Mengimplementasikan 30 resep analisis SQL dan visualisasi interaktif untuk kebutuhan eksplorasi.','Implemented 30 SQL analysis recipes and interactive charts for data exploration.'),
        t('Menyediakan data profiling, pemetaan kolom, SQL Playground, dan fitur ekspor hasil.','Added data profiling, column mapping, SQL Playground, and export features.')
      ],'https://github.com/Darren0099/DataForge'),
      entry(t('YRI HRD — Dashboard Evaluasi', 'YRI HRD — Candidate Evaluation Dashboard'),'Next.js · PostgreSQL · Drizzle ORM','2026',[
        t('Membangun prototipe dashboard kandidat dengan form input, pencatatan wawancara, dan antarmuka responsif.','Built a candidate dashboard prototype with forms, interview logging, and responsive UI.'),
        t('Mengimplementasikan 5 kriteria evaluasi beserta logika ranking berdasarkan data penilaian.','Implemented 5 assessment criteria and ranking logic based on recorded evaluations.'),
        t('Mengembangkan laporan Excel/PDF; prototipe belum divalidasi sebagai sistem produksi resmi.','Added Excel/PDF reporting; the prototype has not been validated as an official production system.')
      ],'https://github.com/Darren0099/YRIHRD')
    ],
    skills: [
      skill(t('Bahasa & antarmuka','Languages & frontend'),'HTML, CSS, JavaScript, TypeScript, React, Next.js, SvelteKit'),
      skill(t('Backend & data','Backend & data'),'PHP, MySQL, PostgreSQL, Drizzle ORM, REST API, GitHub API'),
      skill(t('Peralatan','Tools'),'Git, GitHub, Vercel, VS Code, Figma'),
      skill(t('Praktik','Practices'),'Responsive Design, CMS, UI/UX, Web Accessibility')
    ],
    certificates:['CSS Essentials — Cisco Networking Academy','Belajar Back-End Pemula dengan JavaScript — Dicoding','Belajar Dasar Pemrograman JavaScript — Dicoding'],
    highlights:[
      t('Finalis IT Fest — Web Design (2024).','IT Fest Web Design Finalist (2024).'),
      t('Finalis KMIPN VI — e-Government (2024).','KMIPN VI e-Government Finalist (2024).')
    ]
  },
  data: {
    label: t('Data Analyst', 'Data Analyst'),
    headline: t('Data Analyst | Python, SQL & Dashboard', 'Data Analyst | Python, SQL & Dashboards'),
    summary: t('Lulusan D3 Teknik Komputer dengan portofolio analisis data berbasis Python, SQL, Excel, dan visualisasi. Berpengalaman memvalidasi kualitas data, menggabungkan beberapa tabel, mengukur performa historis, serta menyajikan hasil yang dapat ditelusuri melalui notebook dan dashboard.','Computer Engineering graduate with Python, SQL, Excel, and visualization projects. Experienced in data validation, multi-table joins, historical performance analysis, and communicating reproducible insights through notebooks and dashboards.'),
    experience: [
      entry(t('Pengembang Analitik Independen — KleinData', 'Independent Analytics Developer — KleinData'),'KleinData · Proyek mandiri','2026',[
        t('Membangun workspace analitik dengan SvelteKit dan DuckDB-Wasm yang mendukung 5 format impor dataset.','Developed a SvelteKit and DuckDB-Wasm analytics workspace supporting 5 dataset import formats.'),
        t('Mengembangkan 30 resep insight SQL untuk ringkasan, segmen, penjualan, tren, pelanggan, dan kualitas data.','Built 30 SQL insight recipes covering summaries, segments, sales, trends, customers, and data quality.'),
        t('Menerapkan pemetaan kolom otomatis, pemeriksaan data kosong/duplikat, dan ekspor hasil yang dapat diverifikasi.','Added column mapping, missing-value and duplicate checks, and traceable exports.')
      ],'https://github.com/Darren0099/DataForge'),
      entry(t('Analis Data — Proyek Portofolio', 'Data Analyst — Independent Portfolio Projects'),'GitHub · Python / Pandas / Jupyter','2026',[
        t('Melakukan pembersihan data dan penggabungan multi-tabel untuk analisis penjualan, laba kotor, dan pelanggan.','Cleaned and joined multi-table datasets to analyze sales, gross profit, and customers.'),
        t('Menetapkan definisi metrik dan batasan data, seperti perbedaan laba kotor dengan laba bersih.','Defined metrics and documented caveats such as gross profit versus net profit.'),
        t('Menyusun notebook, visualisasi, dan laporan sehingga perhitungan dapat diulangi dari dataset sumber.','Prepared notebooks, visualizations, and reports for reproducible source-to-result analysis.')
      ],'https://github.com/Darren0099/global-electronics-retailer-analysis'),
      entry(t('Koordinator Pelaporan Kinerja Anggota', 'Member Performance Reporting Coordinator'),'Youth Ranger Indonesia · Human Resources','Jun 2025 – Jan 2026',[
        t('Mengorganisasi pencatatan evaluasi anggota melalui Individual Performance Log dan Weekly Division Pulse.','Organized individual evaluation records through Individual Performance Log and Weekly Division Pulse.'),
        t('Mendukung pemetaan talenta dan laporan perkembangan anggota sebagai bagian dari 7 program HR.','Supported talent mapping and member development reports within 7 HR programs.'),
        t('Menyusun informasi terstruktur agar tim lintas regional dapat meninjau tindak lanjut pengembangan.','Structured records so cross-regional teams could review development follow-up.')
      ])
    ],
    projects: [
      entry(t('Global Electronics Retailer — Analisis Multi-tabel', 'Global Electronics Retailer — Multi-table Analysis'),'Python · Pandas · RFM','2026',[
        t('Menggabungkan transaksi dengan data produk, pelanggan, toko, dan kurs harian sebagai dasar analisis.','Joined sales, product, customer, store, and daily exchange-rate datasets.'),
        t('Menganalisis 11.887 pelanggan dengan segmentasi RFM dan performa pada 67 toko fisik/online.','Analyzed 11,887 customers with RFM segmentation and performance across 67 physical/online stores.'),
        t('Menghasilkan metrik pendapatan, biaya, laba kotor, dan margin dengan mencatat keterbatasan dataset.','Produced revenue, cost, gross-profit, and margin metrics with explicit dataset limitations.')
      ],'https://github.com/Darren0099/global-electronics-retailer-analysis'),
      entry(t('Walmart — Analisis Penjualan Mingguan', 'Walmart — Weekly Sales Analysis'),'Python · Jupyter · Google Sheets','2026',[
        t('Mengaudit 6.435 catatan penjualan mingguan dari 45 toko dan 143 minggu historis.','Audited 6,435 weekly sales records from 45 stores across 143 historical weeks.'),
        t('Membandingkan tren bulanan dan periode setara serta memeriksa data kosong, duplikat, dan tanggal.','Compared monthly trends and like-for-like periods while checking missing records, duplicates, and dates.'),
        t('Membuat notebook, grafik, dan laporan untuk menunjukkan temuan serta keterbatasan analisis.','Prepared notebooks, charts, and reports communicating findings and analytical limitations.')
      ],'https://github.com/Darren0099/Analisis-Dataset-Walmart'),
      entry(t('Annyeongbap — Analisis Penjualan Restoran', 'Annyeongbap — Restaurant Sales Analysis'),'Python · Excel · Data Validation','2026',[
        t('Mengolah 20.000 baris item pesanan dan memetakan transaksi ke kategori menu serta metode pembayaran.','Processed 20,000 line items and mapped orders to menu categories and payment methods.'),
        t('Memvalidasi 7.184 transaksi unik dan menghitung penjualan setelah diskon, bukan hanya subtotal.','Validated 7,184 unique transactions and calculated post-discount sales instead of subtotals.'),
        t('Menyajikan kontribusi kategori, Average Order Value, dan tren penjualan bulanan dalam laporan.','Reported category contributions, average order value, and monthly sales trends.')
      ],'https://github.com/Darren0099/annyeongbap-sales-analysis')
    ],
    skills: [
      skill(t('Pemrograman data','Data programming'),'Python, pandas, numpy, Jupyter Notebook'),
      skill(t('Query & basis data','Query & database'),'SQL, DuckDB, MySQL, PostgreSQL'),
      skill(t('Analisis','Analysis'),'Data Cleaning, EDA, RFM, Time Series, Data Quality'),
      skill(t('Visualisasi','Visualization'),'Excel, Google Sheets, Chart.js, matplotlib')
    ],
    certificates:['Data Analytics Essentials — Cisco Networking Academy','Bootcamp Data Analyst — KarirNex (2026)','Data Science in Marketing: Customer Segmentation — DQLab'],
    highlights:[
      t('Analisis Walmart mencakup 45 toko dan 6.435 catatan mingguan historis.','Walmart project covers 45 stores and 6,435 historical weekly records.'),
      t('KleinData memiliki 30 resep analisis SQL dan 5 format impor.','KleinData supports 30 SQL analysis recipes and 5 import formats.')
    ]
  },
  design: {
    label: t('Graphic Designer','Graphic Designer'),
    headline: t('Graphic Designer | Visual Communication & Brand Content', 'Graphic Designer | Visual Communication & Brand Content'),
    summary: t('Desainer grafis dengan pengalaman merancang materi publikasi komunitas, komunikasi acara, dan konten editorial media sosial. Terbiasa berkolaborasi lintas divisi, menjaga konsistensi identitas visual, dan menerjemahkan pesan organisasi ke dalam desain yang jelas dan mudah dipahami.','Graphic designer experienced in community publications, event communication, and social-media editorial content. Comfortable working across teams, maintaining visual consistency, and translating organizational messages into clear, usable design.'),
    experience: [
      entry(t('Desainer Konten — Divisi Operation', 'Content Designer — Operations Division'),'Kawan YRI · Youth Ranger Indonesia Pusat','2026',[
        t('Membuat konten grafis Instagram untuk mendukung komunikasi kegiatan dan operasi organisasi pusat.','Designed Instagram graphics supporting central organization operations and updates.'),
        t('Mengubah brief kegiatan menjadi struktur informasi, hierarki visual, dan materi editorial yang mudah dibaca.','Translated activity briefs into clear visual hierarchy and readable editorial assets.'),
        t('Menyesuaikan layout agar identitas dan gaya konten konsisten di berbagai unggahan.','Adapted layouts to maintain a consistent identity across social posts.')
      ],'https://www.instagram.com/kawan.yri/'),
      entry(t('Desainer Grafis — Youthopia Symposium', 'Graphic Designer — Youthopia Symposium'),'Duta Potensi Pemuda Indonesia','2025',[
        t('Membuat materi visual acara pemuda untuk kebutuhan publikasi digital dan komunikasi promosi.','Created digital promotional and communication materials for a youth event.'),
        t('Menyusun tipografi, komposisi, serta penggunaan elemen grafis yang konsisten antar materi.','Maintained consistent typography, composition, and graphic elements across assets.'),
        t('Berkolaborasi dengan tim konten dan publikasi dalam menyesuaikan desain terhadap tema acara.','Worked with content and publication teams to align designs with the event theme.')
      ]),
      entry(t('Ketua / Koordinator Divisi Graphic Design', 'Head / Coordinator of Graphic Design'),'Youth Ranger Indonesia Sumatera Selatan','2023 – 2024',[
        t('Mengoordinasikan kebutuhan desain, publikasi, serta dokumentasi kegiatan internal dan eksternal.','Coordinated design, publication, and documentation needs for internal and external activities.'),
        t('Membuat banner, poster, sertifikat, konten edukasi Instagram, dan materi proposal.','Produced banners, posters, certificates, Instagram educational posts, and proposal materials.'),
        t('Membantu membentuk dan mempertahankan identitas visual regional pada kanal komunikasi organisasi.','Helped establish and preserve the regional visual identity across communications.')
      ])
    ],
    projects: [
      entry(t('Kawan YRI — Sistem Konten Editorial', 'Kawan YRI — Editorial Social Content'),'Instagram · Visual Storytelling','2026',[
        t('Mengembangkan layout unggahan yang menekankan judul, isi utama, dan ajakan bertindak secara berjenjang.','Developed social layouts highlighting the headline, core message, and call to action.'),
        t('Mengemas informasi kegiatan organisasi dalam desain feed yang konsisten untuk keterbacaan.','Adapted operations information into consistent, readable feed designs.'),
        t('Menyiapkan aset komunikasi yang mudah diperbarui ketika brief atau jadwal berubah.','Prepared communication assets that could be updated as briefs or schedules changed.')
      ],'https://www.instagram.com/kawan.yri/'),
      entry(t('YRI Sumsel — Publikasi & Visual Event', 'YRI Sumsel — Event Visual Communications'),'Branding · Publication · Community','2023 – 2025',[
        t('Menyusun materi visual untuk berbagai acara komunitas, dari pengumuman hingga dokumentasi kegiatan.','Produced community-event assets from announcements to documentation.'),
        t('Mengembangkan aset lintas format seperti poster, sertifikat, konten Instagram, dan sampul proposal.','Created assets across poster, certificate, Instagram, and proposal-cover formats.'),
        t('Menjaga kesinambungan gaya visual agar identitas regional tetap dikenali.','Kept visual presentation consistent to maintain regional brand recognition.')
      ]),
      entry(t('Dapur Ummi Kyana — Desain Web & Branding Digital', 'Dapur Ummi Kyana — Web Visual Design'),'HTML · CSS · Digital Branding','2024 – 2025',[
        t('Mendesain tampilan katalog web UMKM yang menonjolkan identitas usaha serta produk kuliner.','Designed an SME catalog website highlighting business identity and culinary products.'),
        t('Mengatur susunan informasi menu, produk unggulan, dan visual pendukung agar mudah dipindai.','Organized menu descriptions, featured products, and supporting visuals for easy scanning.'),
        t('Mengimplementasikan layout responsif menggunakan HTML, CSS, dan JavaScript.','Implemented responsive layouts using HTML, CSS, and JavaScript.')
      ],'https://github.com/Darren0099/PENGABDIAN-MASYARAKAT-UMKM-DAPURUMMIKYANAPALEMBANG')
    ],
    skills: [
      skill(t('Desain visual','Visual design'),'Figma, Canva, Layout, Typography'),
      skill(t('Komunikasi brand','Brand communication'),'Visual Identity, Social Media, Editorial Design'),
      skill(t('Produksi aset','Asset production'),'Event Collateral, Posters, Certificates, Proposals'),
      skill(t('Antarmuka','Interface design'),'Wireframing, UI/UX, Responsive Design, HTML, CSS')
    ],
    certificates:['Graphic Design: Brand Identity — MySkill','UI/UX Design: Design System & Wireframing — MySkill','CSS Essentials — Cisco Networking Academy'],
    highlights:[
      t('Pengalaman sebagai koordinator desain regional Youth Ranger Indonesia.','Led regional graphic design coordination at Youth Ranger Indonesia.'),
      t('Finalis IT Fest Web Design (2024).','IT Fest Web Design Finalist (2024).')
    ]
  },
  hr: {
    label: t('Human Resources','Human Resources'),
    headline: t('Human Resources | Recruitment & People Operations', 'Human Resources | Recruitment & People Operations'),
    summary: t('Berpengalaman memimpin koordinasi sumber daya manusia dan program pengembangan anggota di organisasi pemuda lintas regional. Menguasai administrasi rekrutmen, pemetaan talenta, evaluasi kinerja anggota, dan komunikasi lintas tim; didukung kemampuan membangun aplikasi pencatatan HR.','Experienced in coordinating people programs and member development across a multi-regional youth organization. Skilled in recruitment administration, talent mapping, performance documentation, and cross-team communication, supported by hands-on HR application development.'),
    experience: [
      entry(t('Ketua Human Resources — Distrik Sumatera 2', 'Head of Human Resources — Sumatera 2 District'),'Youth Ranger Indonesia','Jun 2025 – Jan 2026',[
        t('Memimpin koordinasi 7 program HR: Talent System, HR Connect, Cultural Check-In, RDC, HR Reward, Weekly Pulse, dan Individual Log.','Coordinated 7 HR programs: Talent System, HR Connect, Cultural Check-In, RDC, HR Reward, Weekly Pulse, and Individual Log.'),
        t('Mengembangkan praktik pencatatan kinerja dan pemetaan talenta untuk membantu evaluasi serta pengembangan anggota.','Structured performance documentation and talent mapping to support member evaluation and development.'),
        t('Memfasilitasi komunikasi antara pimpinan distrik, pengurus regional, dan anggota tim HR dalam pelaksanaan program.','Facilitated coordination between district leadership, regional managers, and the HR team.')
      ]),
      entry(t('Koordinasi Rekrutmen Volunteer — Summit of Stars', 'Volunteer Recruitment Coordination — Summit of Stars'),'Youth Ranger Indonesia','2025',[
        t('Mendukung administrasi kandidat dan persiapan alur wawancara volunteer pada kegiatan organisasi.','Supported candidate administration and volunteer interview workflows.'),
        t('Membuat halaman jadwal wawancara yang mengelompokkan narasumber dan agenda berdasarkan hari.','Built an interview scheduling reference page organizing interviewers and sessions by day.'),
        t('Menyajikan informasi wawancara melalui antarmuka responsif agar mudah diakses panitia dan peserta.','Published responsive interview information for committee members and applicants.')
      ],'https://github.com/Darren0099/VOLUNTEERSUMMITSTAR'),
      entry(t('Koordinator Divisi Desain — Kepemimpinan Tim', 'Design Division Coordinator — Team Leadership'),'Youth Ranger Indonesia Sumatera Selatan','2023 – 2024',[
        t('Membagi dan mengoordinasikan kebutuhan publikasi serta dokumentasi kegiatan kepada tim.','Coordinated team assignments for publication and documentation needs.'),
        t('Berkomunikasi dengan divisi terkait untuk menyelaraskan materi dan kebutuhan acara.','Worked with other divisions to align materials with event requirements.'),
        t('Menjaga konsistensi pelaksanaan pekerjaan melalui koordinasi dan pemeriksaan materi sebelum publikasi.','Supported consistent work delivery through coordination and publication checks.')
      ])
    ],
    projects: [
      entry(t('YRI HRD — Prototipe Dashboard Rekrutmen', 'YRI HRD — Recruitment Dashboard Prototype'),'Next.js · PostgreSQL · Drizzle ORM','2026',[
        t('Mengembangkan pencatatan data kandidat dan formulir penilaian wawancara dalam dashboard terpusat.','Built a central dashboard for candidate records and interview scoring forms.'),
        t('Mengimplementasikan 5 dimensi evaluasi serta tampilan peringkat kandidat per regional dan divisi.','Implemented 5 evaluation dimensions and candidate rankings by region and division.'),
        t('Menyediakan ekspor laporan Excel dan PDF; logika penilaian masih berupa prototipe yang perlu validasi.','Implemented Excel/PDF reporting; scoring policies remain a prototype requiring validation.')
      ],'https://github.com/Darren0099/YRIHRD'),
      entry(t('HR Connect & Talent System — Program Tim', 'HR Connect & Talent System — Team Programs'),'People Operations · Talent Development','2025',[
        t('Mengoordinasikan kegiatan komunikasi HR dan pemetaan talenta lintas wilayah operasional.','Coordinated HR communication and talent mapping across operational regions.'),
        t('Menggunakan Individual Performance Log dan Weekly Pulse untuk dokumentasi pemantauan anggota.','Used Individual Performance Log and Weekly Pulse to document member activity.'),
        t('Menghubungkan hasil pencatatan dengan percakapan tindak lanjut bersama tim HR regional.','Linked recorded observations with follow-up conversations across regional HR teams.')
      ]),
      entry(t('Summit of Stars — Portal Jadwal Wawancara', 'Summit of Stars — Interview Schedule Portal'),'HTML · CSS · JavaScript','2025',[
        t('Membangun portal informasi jadwal wawancara yang disusun berdasarkan hari pelaksanaan.','Built an interview schedule portal organized by day.'),
        t('Membuat kartu pewawancara dan kelompok jadwal interaktif untuk memudahkan penelusuran.','Created interviewer cards and expandable schedule groups for easy navigation.'),
        t('Merancang tampilan adaptif desktop dan mobile; portal ini adalah referensi jadwal, bukan sistem booking.','Designed mobile and desktop layouts; the portal is a schedule reference, not a booking system.')
      ],'https://github.com/Darren0099/VOLUNTEERSUMMITSTAR')
    ],
    skills: [
      skill(t('Administrasi HR','HR administration'),'Recruitment, Candidate Evaluation, Performance Reporting'),
      skill(t('Pengembangan SDM','People development'),'Talent Mapping, Engagement, Member Development'),
      skill(t('Koordinasi','Coordination'),'Team Leadership, Stakeholder Communication, Planning'),
      skill(t('Tools','Tools'),'Excel, Google Sheets, Next.js, HR Dashboard')
    ],
    certificates:['Human Resource at YRI District 2 Batch II — YRI','HR Value Chain — MySkill x Deloitte','IT Customer Support Basics — Cisco Networking Academy'],
    highlights:[
      t('Mengoordinasikan 7 program HR Distrik Sumatera 2.','Coordinated 7 HR programs across Sumatera 2 District.'),
      t('Mengembangkan prototipe sistem evaluasi dengan 5 dimensi penilaian.','Built a prototype evaluation system with 5 assessment dimensions.')
    ]
  }
};

export const cvEducation = {
  institution: t('Politeknik Negeri Sriwijaya','Sriwijaya State Polytechnic'),
  degree: t('Diploma III Teknik Komputer','Diploma III in Computer Engineering'),
  period: '2023 – 2026',
  gpa: '3,66 / 4,00',
  courses: t('Pemrograman Web, Basis Data, Pemrograman Berorientasi Objek, Jaringan Komputer','Web Programming, Databases, Object-Oriented Programming, Computer Networks')
};
