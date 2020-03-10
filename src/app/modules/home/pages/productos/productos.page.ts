import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.redux';
import { pedirProductoAction, vaciarProductoAction } from 'src/app/store/actions/productos.action';
import { RespProductos } from 'src/app/shared/interfaces/producto.interface';
import { IonInfiniteScroll } from '@ionic/angular';
import { PRODUCTO_URL_PAGINATE } from 'src/app/config/variable.config';
import { InformacionService } from 'src/app/core/services/informacion.service';
import { Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  productos: RespProductos;
  productos$: Subscription = new Subscription();
  constructor(
    private route: Router,
    private store: Store<AppState>,
    private informacionService: InformacionService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.store.dispatch(vaciarProductoAction());
    this.store.dispatch(pedirProductoAction({
      url: PRODUCTO_URL_PAGINATE
    }));
    this.solicitarProducto();
  }
  solicitarProducto() {
    this.productos$ = this.store.pipe(
      select(state => state.productos),
      filter(resp => resp.data !== null)
    ).subscribe(resp => {
      this.productos = resp;
      console.log(resp);
    });
  }
  ionViewDidLeave() {
    this.productos$.unsubscribe();
  }
  cargarDato(event, meta: RespProductos['meta']) {
    // tslint:disable-next-line: no-string-literal
    const next = meta.pagination.links.next;
    console.log(next);
    if (typeof next !== 'undefined') {
      console.log('entre');
      this.store.dispatch(pedirProductoAction({
        url: next
      }));
      event.target.complete();
      return;
    }
    event.target.complete();
    this.informacionService.presentToast('No hay mas informacion');
    return;
  }
  irProducto(id) {
    this.route.navigate([`/home/productos`, id]);
  }
  irSubProducto(item) {
    this.route.navigate(['/home/subproductos', item.id]);
  }
}
