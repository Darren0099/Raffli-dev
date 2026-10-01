export interface Certificate {
  id: number;
  pill: string;
  category: 'webdev' | 'data' | 'cyber' | 'cloud' | 'design' | 'hr' | 'frontend';
  categoryLabel: string;
  title: string;
  description: string;
  cardType: string;
  colorClass?: string;
  imageUrl?: string;
  link: string;
}

export const initialCertificates: Certificate[] = [
  {
    id: 1,
    pill: 'CredMark',
    category: 'webdev',
    categoryLabel: 'Web Development',
    title: 'PHP Level 3 Certification (Top 50%)',
    description: 'Sertifikasi tingkat lanjut penguasaan bahasa pemrograman PHP & ekosistem backend dengan Credential ID CM-2602-JSI_PT0.',
    cardType: 'cert-tall',
    link: 'https://credmark.ai/badge/CM-2602-JSI_PT0'
  },
  {
    id: 2,
    pill: 'Dicoding Indonesia',
    category: 'webdev',
    categoryLabel: 'Web Development',
    title: 'Belajar Back-End Pemula dengan JavaScript',
    description: 'Pengembangan backend pemula menggunakan Node.js dan JavaScript dengan Credential ID 6RPNYMRDRZ2M.',
    cardType: 'cert-standard',
    colorClass: 'color-green',
    link: 'https://www.dicoding.com/certificates/6RPNYMRDRZ2M'
  },
  {
    id: 3,
    pill: 'Dicoding Indonesia',
    category: 'webdev',
    categoryLabel: 'Web Development',
    title: 'Belajar Dasar Pemrograman JavaScript',
    description: 'Fondasi dasar bahasa pemrograman JavaScript untuk pengembangan aplikasi web (Credential ID: QLZ9VWEK7X5D).',
    cardType: 'cert-standard',
    link: 'https://www.dicoding.com/certificates/QLZ9VWEK7X5D'
  },
  {
    id: 4,
    pill: 'MySkill',
    category: 'webdev',
    categoryLabel: 'Frontend Developer',
    title: 'Short Class Software Engineering: Frontend Development',
    description: 'Mempelajari pembangunan bagian front-end website dan web aplikasi interaktif menggunakan HTML, CSS, dan JavaScript.',
    cardType: 'cert-standard',
    colorClass: 'color-green',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/280076518/treasury?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg'
  },

  // 2. Data Analyst & Data Science
  {
    id: 5,
    pill: 'KarirNex',
    category: 'data',
    categoryLabel: 'Data Analyst',
    title: 'Bootcamp Data Analyst (Excel, SQL, Python, & Looker Studio)',
    description: 'Pelatihan intensif pembersihan data, visualisasi, dan pembuatan dashboard analitis (ID Kredensial: 0898/B-9/KBT.DA.5/KRX/V/2026).',
    cardType: 'cert-tall',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/459758262/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BQGQl1eJQS9Gm6iF1rI8rIw%3D%3D'
  },
  {
    id: 6,
    pill: 'RevoU',
    category: 'data',
    categoryLabel: 'Data Analyst',
    title: 'Intro to Data Analyst',
    description: 'Pengenalan fundamental analisis data untuk kebutuhan bisnis.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1925145695/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BQGQl1eJQS9Gm6iF1rI8rIw%3D%3D'
  },
  {
    id: 7,
    pill: 'DQLab',
    category: 'data',
    categoryLabel: 'Data Analyst',
    title: 'Data Science in Marketing: Customer Segmentation',
    description: 'Penerapan clustering dan Algoritma K-Means untuk segmentasi pelanggan dalam ranah pemasaran.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1158549083/treasury?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg'
  },
  {
    id: 8,
    pill: 'DQLab',
    category: 'data',
    categoryLabel: 'Data Analyst',
    title: 'R for Data Professional - Part 1 & 2',
    description: 'Penguasaan bahasa pemrograman R tingkat lanjut untuk kebutuhan profesional data.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1153787998/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 9,
    pill: 'DQLab',
    category: 'data',
    categoryLabel: 'Data Analyst',
    title: 'Introduction to Data Science with R & R Fundamental',
    description: 'Dasar-dasar pengolahan data science menggunakan bahasa pemrograman R.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1153741033/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 10,
    pill: 'DQLab',
    category: 'data',
    categoryLabel: 'Data Analyst',
    title: 'Guide to Learn R with AI at DQLab',
    description: 'Panduan pemanfaatan kecerdasan buatan untuk mempelajari bahasa pemrograman R.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1153620217/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 11,
    pill: 'MySkill',
    category: 'data',
    categoryLabel: 'Data Analyst',
    title: 'Short Class Data for Business: Data Science Introduction',
    description: 'Pengenalan ilmu data untuk mengekstrak wawasan bermakna bagi kepentingan bisnis.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1999115737/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 12,
    pill: 'MySkill',
    category: 'data',
    categoryLabel: 'Data Analyst',
    title: 'Intensive Bootcamp Data Analysis: Python Introduction',
    description: 'Penggunaan bahasa pemrograman Python sebagai titik awal analisis data.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1644956411/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 13,
    pill: 'MySkill',
    category: 'data',
    categoryLabel: 'Data Analyst',
    title: 'Microsoft Excel: Vlookup, Hlookup, Index Match & Pivot Table',
    description: 'Menguasai fungsi pengolahan data tingkat lanjut di Excel untuk merangkum dan menganalisis tren data.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/855897715/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },

  // 3. Human Resource (HR)
  {
    id: 14,
    pill: 'Youth Ranger Indonesia',
    category: 'hr',
    categoryLabel: 'Human Resource',
    title: 'Human Resource at YRI District 2 Batch II',
    description: 'Mengkoordinasikan Divisi HR, manajemen relawan, serta sukses mengeksekusi 6 dari 7 program kerja organisasi.',
    cardType: 'cert-wide',
    colorClass: 'color-orange',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/2029911844/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 15,
    pill: 'MySkill x Deloitte',
    category: 'hr',
    categoryLabel: 'Human Resource',
    title: 'Intensive Bootcamp Human Resource: Understanding HR Value Chain',
    description: 'Mempelajari rantai nilai HR (HR Value Chain) untuk menunjukkan bagaimana HR memberikan kontribusi nyata pada tujuan organisasi.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1169304994/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },

  // 4. Graphic Design & UI/UX
  {
    id: 16,
    pill: 'MySkill',
    category: 'design',
    categoryLabel: 'Graphic Design',
    title: 'Short Class Graphic Design: Brand Identity',
    description: 'Mempelajari perancangan identitas merek (brand identity) untuk mendukung tujuan bisnis dan pengalaman pelanggan.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1891225986/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 17,
    pill: 'MySkill',
    category: 'design',
    categoryLabel: 'Graphic Design',
    title: 'Short Class UI/UX Design: Design System & Wireframing',
    description: 'Mempelajari pembuatan Design System dan Wireframe untuk mempermudah alur kerja desain antarmuka pengguna.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1998697254/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 18,
    pill: 'MySkill',
    category: 'design',
    categoryLabel: 'Graphic Design',
    title: 'Short Class UI/UX Research Design: UX Writing Fundamental',
    description: 'Memahami penulisan UX untuk memandu pengguna mencapai tujuannya dengan pesan yang jelas.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/1645053781/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },

  // 5. Additional / Other Certifications (Cyber Security, Cloud, AI, Management, etc.)
  {
    id: 19,
    pill: 'IT Masters (CSU)',
    category: 'cyber',
    categoryLabel: 'Cyber Security',
    title: 'Cyber Defence Strategies',
    description: 'Pelatihan komprehensif strategi pertahanan siber, penilaian risiko, serta implementasi ISO 27001, NIST CSF, dan NIST SP 800-53.',
    cardType: 'cert-wide',
    colorClass: 'color-blue',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/679093998/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 20,
    pill: 'Charles Sturt Univ',
    category: 'cyber',
    categoryLabel: 'Cyber Security',
    title: 'Hacking Countermeasures 2026',
    description: 'Mempelajari pertahanan keamanan jaringan, malware, manajemen kerentanan, dan incident response (Nilai akhir: 96.92).',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/481753599/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 21,
    pill: 'Charles Sturt Univ',
    category: 'cyber',
    categoryLabel: 'Cyber Security',
    title: 'Networking Certification Essentials',
    description: 'Pemahaman fundamental arsitektur jaringan komputer, IP addressing, routing, VLAN, dan keamanan jaringan.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/330178347/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 22,
    pill: 'Dicoding Indonesia',
    category: 'cloud',
    categoryLabel: 'Cloud Computing',
    title: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)',
    description: 'Dasar-dasar komputasi awan Amazon Web Services (AWS) dengan Credential ID KEXLYOW40ZG2.',
    cardType: 'cert-standard',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    link: 'https://www.dicoding.com/certificates/KEXLYOW40ZG2'
  },
  {
    id: 23,
    pill: 'Dicoding Indonesia',
    category: 'data',
    categoryLabel: 'Data Analysis',
    title: 'Belajar Dasar AI',
    description: 'Pengenalan dasar-dasar kecerdasan buatan (Credential ID: 6RPNYM6YQZ2M).',
    cardType: 'cert-standard',
    link: 'https://www.dicoding.com/certificates/6RPNYM6YQZ2M'
  },
  {
    id: 24,
    pill: 'University of Maryland',
    category: 'data',
    categoryLabel: 'Data Analysis',
    title: 'AI and Career Empowerment',
    description: 'Eksplorasi fundamental AI dan aplikasinya di berbagai industri serta strategi karier di era AI.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Certifications/392830120/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BtbSme3YATFGu2VYqNJdpQA%3D%3D'
  },
  {
    id: 25,
    pill: 'Politeknik Negeri Jakarta',
    category: 'webdev',
    categoryLabel: 'Web Development',
    title: 'Finalis KMIPN VI Kategori E-Government (Palembang Go Vacation!)',
    description: 'Finalis Kompetisi Mahasiswa Informatika Politeknik Nasional VI bidang E-Government & Web Development.',
    cardType: 'cert-wide',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Position/2436206185/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_position_details%3BLLwhnULbSTWx492ubesqSg%3D%3D'
  },
  {
    id: 26,
    pill: 'HMJ Teknik Komputer PolSRI',
    category: 'frontend',
    categoryLabel: 'Frontend Developer',
    title: 'Volunteer Festival Multimedia dan Komputer VALTER V',
    description: 'Merancang tampilan website yang responsif, mengembangkan UI/UX yang user-friendly, serta melakukan pengujian fungsionalitas lintas perangkat.',
    cardType: 'cert-standard',
    colorClass: 'color-green',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Position/2576979919/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_position_details%3BXep2nRImQLiA46fwpBO4sg%3D%3D'
  },
  {
    id: 27,
    pill: 'GDSC',
    category: 'frontend',
    categoryLabel: 'Frontend Developer',
    title: 'Study Jam FrontEnd Developer: Basic CSS Animation',
    description: 'Memahami implementasi animasi CSS menggunakan keyframes, timing functions, dan transisi untuk menciptakan elemen web yang dinamis.',
    cardType: 'cert-standard',
    colorClass: 'color-green',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Position/2576979859/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_position_details%3BXep2nRImQLiA46fwpBO4sg%3D%3D'
  },
  {
    id: 28,
    pill: 'Youth Ranger Indonesia',
    category: 'design',
    categoryLabel: 'Graphic Design',
    title: 'Head of Self Development and Design Division at YRI FEST X EXPO 2024',
    description: 'Memimpin tim desain dan pengembangan diri untuk menciptakan konten visual yang menarik bagi pemuda Indonesia pada acara YRI FEST X EXPO 2024.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Position/2451880493/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_position_details%3BXep2nRImQLiA46fwpBO4sg%3D%3D'
  },
  {
    id: 29,
    pill: 'Youth Ranger Indonesia',
    category: 'design',
    categoryLabel: 'Graphic Design',
    title: 'Achievement in Graphic Design – One Year of Excellence YRI Sumsel',
    description: 'Penghargaan atas dedikasi dan kontribusi selama dua tahun sebagai Graphic Designer dalam proyek kreatif dan kampanye media sosial Youth Ranger Indonesia Sumatera Selatan.',
    cardType: 'cert-standard',
    link: 'https://www.linkedin.com/in/al-man-raffli/overlay/Position/2583114121/treasury/?profileId=ACoAAES8EUoB9sYMOwAcjrdT5vVNOaW1yZucIGg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_position_details%3BXep2nRImQLiA46fwpBO4sg%3D%3D'
  }
];

