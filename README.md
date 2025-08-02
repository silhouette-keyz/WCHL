# Proyek Blockchain untuk Registrasi dan Kehadiran Seminar

Berdasarkan hasil diskusi dengan tim , kami melihat potensi untuk membangun sebuah proyek berbasis blockchain yang dapat digunakan dalam proses registrasi dan pencatatan kehadiran kegiatan seminar — baik yang diselenggarakan secara offline maupun online (termasuk via Zoom) — dengan konsep Proof of Attendance.

# Permasalahan yang Dihadapi:
## Sertifikat kehadiran yang tidak sah, seperti:

1. Sertifikat diberikan kepada peserta yang tidak benar-benar hadir.
2. Adanya manipulasi data kehadiran oleh pihak internal atau peserta.
3. Kesulitan memverifikasi keabsahan sertifikat, terutama untuk pihak ketiga seperti institusi atau penyelenggara lanjutan.
4. Kurangnya transparansi dan audit trail yang dapat diverifikasi secara independen.

## Solusi yang Diusulkan:
1. Menggunakan teknologi blockchain untuk mencatat kehadiran peserta secara permanen, transparan, dan tidak dapat dimanipulasi.
2. Setiap peserta yang hadir akan mendapatkan hash sertifikat digital sebagai bukti kehadiran yang tercatat di blockchain.
3. Sertifikat tersebut dapat diverifikasi publik melalui sistem verifikasi berbasis hash di blockchain explorer atau dashboard khusus.
4. Untuk seminar online, kehadiran dicatat secara otomatis saat peserta masuk melalui link zoom dan backend akan membaca jika seseorang join dengan mendapatkan response webhook dari zoom.
5. Untuk seminar offline, kehadiran dicatat dengan memindai QR Code yang telah terverifikasi oleh sistem panitia.

Dengan pendekatan ini, kita dapat meningkatkan kepercayaan, keamanan, dan validitas dari proses kehadiran dan penerbitan sertifikat kegiatan.

# Project ini berjalan diatas jaringan Internet Computer Protocol (ICP)
