import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DetalleProductoServiceService } from 'src/app/core/services/detalle-producto-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetallePedidoPage implements OnInit {
  @ViewChild('myTable', { static: false }) table: any;
  rows: any[] = [
  /* {
    id: 9,
    name: 'Johns Wood',
    gender: 'male',
    age: 52,
    address: {
      state: 'Maine',
      city: 'Witmer'
    }
  },
  {
    id: 9,
    name: 'Johns Wood',
    gender: 'male',
    age: 52,
    address: {
      state: 'Maine',
      city: 'Witmer'
    }
  },
  {
    id: 9,
    name: 'Johns Wood',
    gender: 'male',
    age: 52,
    address: {
      state: 'Maine',
      city: 'Witmer'
    }
  }, */
  ];
  expanded = {};
  timeout: any;
  ColumnMode = ColumnMode;
  subscription = new Subscription();
  ok = false;
  constructor(
    private detalleProductoServiceService: DetalleProductoServiceService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.subscription = this.activatedRoute.params
    .pipe(
      switchMap(( {id}) => this.detalleProductoServiceService.obtenerDetalleProducto(id)),
      filter( resp => resp !== null),
      filter( resp => typeof resp !== 'undefined')
    )
    .subscribe(resp => {
      console.log(resp);
      this.rows = resp;
      this.ok = true;
    });
  }
  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }


}
