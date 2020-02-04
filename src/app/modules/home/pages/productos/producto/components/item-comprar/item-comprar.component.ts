import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InformacionService } from 'src/app/core/services/informacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-comprar',
  templateUrl: './item-comprar.component.html',
  styleUrls: ['./item-comprar.component.scss'],
})
export class ItemComprarComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private informacionService: InformacionService,
    private router: Router
  ) { }

  ngOnInit() {}
  comprar() {
    this.informacionService.presentToast('Agregado a tu carrito');
    this.modalCtrl.dismiss();
    this.router.navigate(['/home/productos']);
  }
  cancelar() {
    this.modalCtrl.dismiss();
  }
}
