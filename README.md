M Afnan Baihaqi 
H1D022080
Shift B


ScreenShot
  
![Screenshot 2024-12-04 153638](https://github.com/user-attachments/assets/e3278db9-53da-4a54-b5f5-b8f35312c787)
 
![Screenshot 2024-12-04 153700](https://github.com/user-attachments/assets/46f70ecb-f451-4d00-99ca-7f550a2ad850)

![Screenshot 2024-12-04 153716](https://github.com/user-attachments/assets/1e2c9d3d-6424-4d7f-89a3-a723484ae866)

![Screenshot 2024-12-04 153736](https://github.com/user-attachments/assets/3fb4695c-7f95-47e0-8632-8334809ff49e)


Penjelasan

Kode tersebut adalah implementasi sebuah komponen halaman resep pada aplikasi berbasis Ionic Angular yang bertujuan untuk mengelola data resep menggunakan operasi CRUD (Create, Read, Update, Delete). Pada awalnya, terdapat beberapa modul yang diimpor, seperti Component dan OnInit dari Angular untuk mendeklarasikan dan mengatur lifecycle komponen, ModalController dari Ionic untuk mengontrol tampilan modal, dan ApiService untuk menghubungkan komponen dengan backend melalui API. Komponen ini dideklarasikan menggunakan decorator @Component, yang menentukan selector, template, dan style file untuk halaman resep.
Komponen ini memiliki sejumlah properti, termasuk variabel dataResep untuk menyimpan data resep yang ditampilkan di halaman, dan variabel lainnya (id, nama, langkah) yang digunakan untuk mengelola form input resep. Konstruktor ResepPage digunakan untuk menyuntikkan dependensi ApiService dan ModalController. Fungsi ngOnInit dipanggil saat komponen diinisialisasi untuk memuat data resep melalui metode getResep, yang melakukan permintaan API ke backend untuk mengambil data dari file tampil.php dan menyimpannya dalam properti dataResep.
Komponen ini juga menyediakan fungsi untuk menambah, mengedit, melihat, dan menghapus data resep. Misalnya, fungsi tambahResep mengirimkan data resep baru ke backend melalui file tambah.php, sementara hapusResep meminta konfirmasi pengguna sebelum menghapus data dengan mengakses file hapus.php. Fungsi openModalTambah dan openModalEdit digunakan untuk membuka modal form, dengan logika tambahan untuk memisahkan antara mode tambah dan edit. Data yang diambil dari backend untuk tujuan edit diisi ulang ke dalam form melalui fungsi ambilResep. Setelah operasi selesai, halaman diperbarui dengan memanggil getResep agar data terbaru dapat ditampilkan.
Secara keseluruhan, kode ini menyediakan kerangka kerja untuk mengelola data resep dengan antarmuka modal yang responsif dan interaksi data berbasis API.


