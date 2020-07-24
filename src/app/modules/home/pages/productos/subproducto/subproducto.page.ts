import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.redux';
import { pedirSubProductoAction } from 'src/app/store/actions/subProducto.actions';
import { filter, map } from 'rxjs/operators';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import Viewer from 'viewerjs';

@Component({
  selector: 'app-subproducto',
  templateUrl: './subproducto.page.html',
  styleUrls: ['./subproducto.page.scss'],
})
export class SubproductoPage implements OnInit {
  items = new Array('' , '', '', '', '');
  subscription = new Subscription();
  productos$ = new Subscription();
  subProductos: Producto[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.subscription = this.activatedRoute.params.subscribe( ({id}) => {
      // console.log(id);
      this.store.dispatch(pedirSubProductoAction({ id }));
    });
    this.productos$ = this.store.pipe(
      select(state => state.subProductos),
      filter(resp => resp.data !== null)
    ).subscribe(resp => {
      this.subProductos = resp.data;
      // console.log(this.subProductos);
    });
  }
  iniciarImagenes(event) {
    // console.log(event);
    const viewer = new Viewer(document.getElementById(event), {
      viewed() {
        viewer.zoomTo(1);
      },
    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
    this.productos$.unsubscribe();
  }
  verDetalle(item) {
    this.router.navigate(['/home/consumible', item.id]);
  }
}
