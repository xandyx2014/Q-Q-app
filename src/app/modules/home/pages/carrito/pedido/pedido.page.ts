import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ACCESSTOKENMAPBOX, USER_AUTH } from 'src/app/config/variable.config';
import * as sumby from 'lodash.sumby';
import { InformacionService } from 'src/app/core/services/informacion.service';
import { PersonService } from 'src/app/core/services/person.service';
import { Storage } from '@ionic/storage';
import { from, Subscription } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.redux';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { OrdenServiceService } from 'src/app/core/services/orden-service.service';
import { Router } from '@angular/router';
import { EliminarTodosCarritoAction } from 'src/app/store/actions/carrito.actions';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit, AfterViewInit {
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  buttonDesactivado = true;
  persona;
  usuario;
  lng: number;
  lat: number;
  myForm: FormGroup;
  ok = false;
  carritoStore$ = new Subscription();
  order$ = new Subscription();
  carrito: Producto[];
  constructor(
    private informacionService: InformacionService,
    private personService: PersonService,
    private storage: Storage,
    private router: Router,
    private fb: FormBuilder,
    private alertController: AlertController,
    private store: Store<AppState>,
    private ordenService: OrdenServiceService
  ) {
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    from(this.storage.get(USER_AUTH))
      .pipe(
        map(result => result[0]),
        switchMap(person => {
          this.usuario = person;
          return this.personService.obtenerCliente(person.person_id);
        })
      )
      .subscribe((res) => {
        this.persona = res;
        // console.log(this.persona);
        this.iniciarFomulario(this.persona);
        this.obtenerProducto();
        this.ok = true;
      });
  }
  ionViewWillLeave() {
    this.carritoStore$.unsubscribe();
    this.order$.unsubscribe();
  }
  obtenerProducto() {
    this.carritoStore$ = this.store.pipe(
      select(state => state.carrito),
      filter(resp => resp.data.length !== null)
    ).subscribe(resp => {
      this.carrito = resp.data;
      // console.log(resp);
    });
  }
  iniciarFomulario(persona) {
    this.myForm = this.fb.group({
      ['name']: [persona.name || '', [Validators.required]],
      ['father_last_name']: [persona.father_last_name || '', [Validators.required]],
      ['mother_last_name']: [persona.mother_last_name || '', [Validators.required]],
      ['full_name']: [persona.full_name || '', [Validators.required]],
      ['ci']: [persona.ci || '', [Validators.required]],
      ['birth_date']: [persona.birth_date || '', [Validators.required]],
      ['birth_place']: [persona.birth_place || '', [Validators.required]],
      ['phone']: [persona.phone || '', [Validators.required]],
      ['cell_phone']: [persona.cell_phone || '', [Validators.required]],
      ['address']: [persona.address || '', [Validators.required]],
      ['email']: [persona.email || '', [Validators.required, Validators.email]]
    }
    );
  }
  async hacerPedido() {
    if (this.buttonDesactivado) {
      return this.informacionService.presentToast('El mapa no termina de cargar');
    } else {
      const alert = await this.alertController.create({
        header: 'Confimar',
        message: 'Los datos estan <strong>correctos</strong>?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
             // console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Aceptar',
            handler: () => {
              console.log('Confirm Okay');
              this.realizarPedido();
            }
          }
        ]
      });

      await alert.present();
    }
  }
  realizarPedido() {
    const pedido = {
      total: this.obtenerSumatoriaTotal(this.carrito),
      latitude: this.lat,
      longitude: this.lng,
      user_app_customer_id: this.usuario.id,
      discount: 0,
      description: '',
      subtotal: this.obtenerSumatoriaTotal(this.carrito),
      branch_office_id: this.persona.branch_office_id,
      data: this.transformarCarrito(this.carrito)
    };
    // console.log(JSON.stringify(pedido));
    this.order$ = this.ordenService.realizarOrden(pedido).subscribe( async resp => {
      console.log('PEDIDO REALIZADO',  resp);
      this.store.dispatch(EliminarTodosCarritoAction());
      await this.router.navigate(['home']);
      this.informacionService.presentAlert({
        header: 'Pedido',
        subHeader: 'Completado',
        message: 'Se ha realizado el pedido'
      });
    });
  }

  transformarCarrito(producto: Producto[]) {
    return producto.map(item => {
      return {
        product_id: item.id,
        description: '',
        quantity: item.cantidad,
        price_cost: item.price_purchase,
        price_sale: item.price_sale,
        price_reference: item.price_sale,
        total: item.cantidad * item.price_sale
      };
    });
  }
  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/light-v10?optimize=true',
      accessToken: ACCESSTOKENMAPBOX,
      // longitud / latitud
      center: [-63.1817381, -17.7839228], // starting position
      zoom: 12 // starting zoom
    });
    this.map.on('load', () => {
      this.map.resize();
      this.buttonDesactivado = false;
    });
    this.map.on('move', (e) => {
      const { lng, lat } = this.map.getCenter();
      this.lng = lng;
      this.lat = lat;
      // console.log(`lng ${lng}`, `lat ${lat}`);
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }
  obtenerSumatoriaTotal(producto: Producto[]) {
    const valores = producto.map((item) => {
      return {
        total: item.cantidad * item.price_sale
      };
    });
    return sumby(valores, 'total');
  }
}
