import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ACCESSTOKENMAPBOX } from 'src/app/config/variable.config';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { InformacionService } from 'src/app/core/services/informacion.service';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit, AfterViewInit {
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  buttonDesactivado = true;
  constructor(
    private informacionService: InformacionService
  ) {
  }

  ngOnInit() {
  }
  hacerPedido() {
    if (this.buttonDesactivado) {
      return this.informacionService.presentToast('El mapa no termina de cargar');
    }
    return this.informacionService.presentAlert({
      header: 'Pedido',
      subHeader: 'Completado',
      message: 'Se ha realizado el pedido'
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
      const {lng, lat} = this.map.getCenter();
      console.log(`lng ${lng}`, `lat ${lat}`);
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
