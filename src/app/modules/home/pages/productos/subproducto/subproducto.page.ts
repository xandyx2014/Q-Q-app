import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemComprarComponent } from './components/item-comprar/item-comprar.component';

@Component({
  selector: 'app-subproducto',
  templateUrl: './subproducto.page.html',
  styleUrls: ['./subproducto.page.scss'],
})
export class SubproductoPage implements OnInit {
  items = new Array('' , '', '', '', '');
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  async agregarCarrito() {
    const modal = await this.modalController.create({
      component: ItemComprarComponent,
      cssClass: 'modal-custom-css'
    });
    return await modal.present();
  }
}
