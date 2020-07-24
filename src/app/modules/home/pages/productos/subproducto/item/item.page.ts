import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemComprarComponent } from '../components/item-comprar/item-comprar.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap, filter, map } from 'rxjs/operators';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.redux';
import { Subscription } from 'rxjs';
import Viewer from 'viewerjs';
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
  subscription = new Subscription();
  producto: Producto;
  ok = false;
  constructor(
    private modalController: ModalController,
    private activateRouter: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.subscription = this.activateRouter.params
    .pipe(
      switchMap( ({id}) => this.iniciarDatos(id))
    )
    .subscribe( (resp: any) => {
      // console.log(resp);
      this.producto = resp;
      this.ok = true;
    } );
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  iniciarDatos(id) {
    return this.store.pipe(
      select(state => state.subProductos),
      filter(result => result.data !== null),
      map(result => result.data),
      map((products: []) => {
        const producto = products.filter((item: any) => item.id === id);
        return producto[0];
      })
    );
  }
  iniciarImagenes(event) {
    // console.log(event);
    const i = `subProducto-${event}`;
    const viewer = new Viewer(document.getElementById(event), {
      viewed() {
        viewer.zoomTo(1);
      },
    });
    // viewer.show();
  }
  async agregarCarrito() {
    const modal = await this.modalController.create({
      component: ItemComprarComponent,
      cssClass: 'modal-custom-css',
      componentProps: {...this.producto}
    });
    return await modal.present();
  }
}
