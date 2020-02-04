import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tipo-pago',
  templateUrl: './tipo-pago.component.html',
  styleUrls: ['./tipo-pago.component.scss'],
})
export class TipoPagoComponent implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}
  formularioPago() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/home/pedido']);
  }
}
