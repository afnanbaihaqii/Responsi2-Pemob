M Afnan Baihaqi 
H1D022080
Shift B


ScreenShot
  
![Screenshot 2024-12-04 153638](https://github.com/user-attachments/assets/e3278db9-53da-4a54-b5f5-b8f35312c787)
 
![Screenshot 2024-12-04 153700](https://github.com/user-attachments/assets/46f70ecb-f451-4d00-99ca-7f550a2ad850)

![Screenshot 2024-12-04 153716](https://github.com/user-attachments/assets/1e2c9d3d-6424-4d7f-89a3-a723484ae866)

![Screenshot 2024-12-04 153736](https://github.com/user-attachments/assets/3fb4695c-7f95-47e0-8632-8334809ff49e)


Penjelasan

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-resep',
  templateUrl: './resep.page.html',
  styleUrls: ['./resep.page.scss'],
})
export class ResepPage implements OnInit {
  dataMahasiswa: any;

  constructor(private api: ApiService ,private modal: ModalController) { }

  ngOnInit() {
    this.getResep();
  }
  
  modalTambah: any;
  id: any;
  nama: any;
  langkah: any;

  getResep() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataResep = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  
  
  resetModal() {
    this.id = null;
    this.nama = '';
    this.langkah = '';
  }
  
  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalTambah = true;
    this.modalEdit = false;
  }
  
  
  cancel() {
    this.modal.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }
  tambahResep() {
    if (this.nama != '' && this.langkah != '') {
      let data = {
        nama: this.nama,
        jurusan: this.langkah,
      }
      this.api.tambah(data, 'tambah.php')
        .subscribe({
          next: (_hasil: any) => {
            this.resetModal();
            console.log('berhasil tambah resep');
            this.getResep();
            this.modalTambah = false;
            this.modal.dismiss();
          },
          error: (_err: any) => {
            console.log('gagal tambah resep');
          }
        })
    } else {
      console.log('gagal tambah resep karena masih ada data yg kosong');
    }
  }
  hapusResep(id: any) {
    const konfirmasi = window.confirm("Apakah Data ingin dihapus?");
    if (konfirmasi) {
      this.api.hapus(id, 'hapus.php?id=').subscribe({
        next: (res: any) => {
          console.log('sukses', res);
          this.getResep();
          console.log('berhasil hapus data');
        },
        error: (_error: any) => {
          console.log('gagal');
        }
      });
    } else {
      console.log('Penghapusan dibatalkan');
    }
  }
  
  ambilResep(id: any) {
    this.api.lihat(id,
      'lihat.php?id=').subscribe({
        next: (hasil: any) => {
          console.log('sukses', hasil);
          let resep = hasil;
          this.id = resep.id;
          this.nama = resep.nama;
          this.jurusan = resep.jurusan;
        },
        error: (_error: any) => {
          console.log('gagal ambil data');
        }
      })
  }
  modalEdit: any;

openModalEdit(isOpen: boolean, idget: any) {
  this.modalEdit = isOpen;
  this.id = idget;
  console.log(this.id);
  this.ambilResep(this.id);
  this.modalTambah = false;
  this.modalEdit = true;
}
editResep() {
  let data = {
    id: this.id,
    nama_resep: this.nama,
    langkah: this.jurusan
  }
  this.api.edit(data, 'edit.php')
    .subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.resetModal();
        this.getResep();
        console.log('berhasil edit Resep');
        this.modalEdit = false;
        this.modal.dismiss();
      },
      error: (_err: any) => {
        console.log('gagal edit Resep');
      }
    })
}
}
Kode tersebut adalah implementasi sebuah komponen halaman resep pada aplikasi berbasis Ionic Angular yang bertujuan untuk mengelola data resep menggunakan operasi CRUD (Create, Read, Update, Delete). Pada awalnya, terdapat beberapa modul yang diimpor, seperti Component dan OnInit dari Angular untuk mendeklarasikan dan mengatur lifecycle komponen, ModalController dari Ionic untuk mengontrol tampilan modal, dan ApiService untuk menghubungkan komponen dengan backend melalui API. Komponen ini dideklarasikan menggunakan decorator @Component, yang menentukan selector, template, dan style file untuk halaman resep.
Komponen ini memiliki sejumlah properti, termasuk variabel dataResep untuk menyimpan data resep yang ditampilkan di halaman, dan variabel lainnya (id, nama, langkah) yang digunakan untuk mengelola form input resep. Konstruktor ResepPage digunakan untuk menyuntikkan dependensi ApiService dan ModalController. Fungsi ngOnInit dipanggil saat komponen diinisialisasi untuk memuat data resep melalui metode getResep, yang melakukan permintaan API ke backend untuk mengambil data dari file tampil.php dan menyimpannya dalam properti dataResep.
Komponen ini juga menyediakan fungsi untuk menambah, mengedit, melihat, dan menghapus data resep. Misalnya, fungsi tambahResep mengirimkan data resep baru ke backend melalui file tambah.php, sementara hapusResep meminta konfirmasi pengguna sebelum menghapus data dengan mengakses file hapus.php. Fungsi openModalTambah dan openModalEdit digunakan untuk membuka modal form, dengan logika tambahan untuk memisahkan antara mode tambah dan edit. Data yang diambil dari backend untuk tujuan edit diisi ulang ke dalam form melalui fungsi ambilResep. Setelah operasi selesai, halaman diperbarui dengan memanggil getResep agar data terbaru dapat ditampilkan.
Secara keseluruhan, kode ini menyediakan kerangka kerja untuk mengelola data resep dengan antarmuka modal yang responsif dan interaksi data berbasis API.


