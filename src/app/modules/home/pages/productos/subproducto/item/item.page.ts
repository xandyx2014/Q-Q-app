import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemComprarComponent } from '../components/item-comprar/item-comprar.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
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
