import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TipoPagoComponent } from './components/tipo-pago/tipo-pago.component';
import { AppState } from 'src/app/store/app.redux';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { EliminarPorIdCarritoAction, ActualizarCantidadCarrito } from 'src/app/store/actions/carrito.actions';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { Subscription } from 'rxjs';
import { CantidadProductoComponent } from './components/cantidad-producto/cantidad-producto.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  items = new Array('', '', '', '');
  carrito: Producto[] = [];
  carritoStore$ = new Subscription();
  constructor(
    private modalController: ModalController,
    private store: Store<AppState>,
  ) { }
  ngOnInit() {
  }
  eliminarItem(item: any) {
    this.store.dispatch(EliminarPorIdCarritoAction({ uid: item.uid}));
  }
  ionViewWillEnter() {
    this.cargarDatos();
  }
  ionViewWillLeave() {
    this.carritoStore$.unsubscribe();
  }
  cargarDatos() {
    this.carritoStore$ = this.store.pipe(
      select(state => state.carrito),
      filter(resp => resp.data.length !== null)
    ).subscribe(resp => {
      this.carrito = resp.data;
      console.log(resp);
    });
  }
  aumentarCantidadProducto(item: Producto, event) {
    event.preventDefault();
    event.stopPropagation();
    this.store.dispatch(ActualizarCantidadCarrito(
      {
        uid: item.uid,
        cantidad: item.cantidad + 1
      }
    ));
  }
  disminuirCantidadProducto(item: Producto, event) {
    event.preventDefault();
    event.stopPropagation();
    const cantidad = item.cantidad === 1 ? item.cantidad : item.cantidad - 1;
    this.store.dispatch(ActualizarCantidadCarrito(
      {
        uid: item.uid,
        cantidad
      }
    ));
  }
  async cantidadProducto(item: Producto) {
    const modal = await this.modalController.create({
      component: CantidadProductoComponent,
      cssClass: 'modal-custom-css',
      componentProps: {...item}
    });
    return await modal.present();
  }
  async agregarCarrito() {
    const modal = await this.modalController.create({
      component: TipoPagoComponent,
      cssClass: 'modal-custom-css'
    });
    return await modal.present();
  }
}
