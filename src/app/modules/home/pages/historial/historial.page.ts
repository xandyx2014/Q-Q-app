import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResultadoComponent } from './page/resultado.component';
import { OrdenServiceService } from 'src/app/core/services/orden-service.service';
import { LoginService } from 'src/app/core/auth/login.service';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  miArray = [, , , , , ];
  $historialPedido: Observable<any>;
  constructor(
    public modalController: ModalController,
    private ordenServiceService: OrdenServiceService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    // this.modalController.dismiss();
    this.obtenerPedido();
  }
  obtenerPedido() {
    this.$historialPedido = from(this.loginService.userAuth())
    .pipe(
      map( resp => resp[0]),
      switchMap( resp => this.ordenServiceService.obtenerOrdenes(
        resp.id,
        { state_order: '4' }))
    );
  }
  async presentModal(pedidoId) {
    const modal = await this.modalController.create({
      component: ResultadoComponent,
      cssClass: 'modal-history-css',
      componentProps: {
        pedidoId
      }
    });
    modal.onDidDismiss().then(( resp )  => {
      if (resp.data) {
        this.obtenerPedido();
      }
    });
    return await modal.present();
  }

}
