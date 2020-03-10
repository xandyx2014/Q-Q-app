import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemComprarComponent } from './components/item-comprar/item-comprar.component';
import { AppState } from 'src/app/store/app.redux';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { map, filter, tap, pluck, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  producto: Producto;
  productos$ = new Subscription();
  constructor(
    private modalController: ModalController,
    private activateRouter: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.activateRouter.params
    .pipe(
      switchMap( ({id}) => this.iniciarDatos(id))
    )
    .subscribe( (resp) => {
      this.producto = resp;
    } );
  }
  iniciarDatos(id) {
    return this.store.pipe(
      select(state => state.productos),
      filter(result => result.data !== null),
      map(result => result.data),
      map((products: []) => {
        const producto = products.filter((item: any) => item.id === id);
        return producto[0];
      })
    );
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
