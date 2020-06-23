import { SwalService } from './swal.service';

export class Services {
  constructor($axios, $store, $router, $swal) {
    this.swal = (title, text) => SwalService($swal, title, text)
  }
}
