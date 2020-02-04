import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TipoPagoComponent } from './components/tipo-pago/tipo-pago.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  items = new Array('', '', '', '');
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  async agregarCarrito() {
    const modal = await this.modalController.create({
      component: TipoPagoComponent,
      cssClass: 'modal-custom-css'
    });
    return await modal.present();
  }
}
