import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-resep',
  templateUrl: './resep.page.html',
  styleUrls: ['./resep.page.scss'],
})
export class ResepPage implements OnInit {
  dataResep: any;
  langkah: any;
  nama: any;

  constructor(private api: ApiService, private modal: ModalController) {}

  ngOnInit() {
    this.getResep();
  }

  modalTambah: any;
  id: any;
  nama_resep: any;
  jurusan: any;

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
    this.nama_resep = '';
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
    if (this.nama != '' && this.jurusan != '') {
      let data = {
        nama: this.nama_resep,
        langkah: this.langkah,
      };
      this.api.tambah(data, 'tambah.php').subscribe({
        next: (_hasil: any) => {
          this.resetModal();
          console.log('berhasil tambah resep');
          this.getResep();
          this.modalTambah = false;
          this.modal.dismiss();
        },
        error: (_err: any) => {
          console.log('gagal tambah resep');
        },
      });
    } else {
      console.log('gagal tambah resep karena masih ada data yg kosong');
    }
  }
  hapusResep(id: any) {
    const konfirmasi = window.confirm('Apakah Data ingin dihapus?');
    if (konfirmasi) {
      this.api.hapus(id, 'hapus.php?id=').subscribe({
        next: (res: any) => {
          console.log('sukses', res);
          this.getResep();
          console.log('berhasil hapus data');
        },
        error: (_error: any) => {
          console.log('gagal');
        },
      });
    } else {
      console.log('Penghapusan dibatalkan');
    }
  }

  ambilResep(id: any) {
    this.api.lihat(id, 'lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let resep = hasil;
        this.id = resep.id;
        this.nama = resep.nama;
        this.langkah = resep.langkah;
      },
      error: (_error: any) => {
        console.log('gagal ambil data');
      },
    });
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
      langkah: this.langkah,
    };
    this.api.edit(data, 'edit.php').subscribe({
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
      },
    });
  }
}
