import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ACCESSTOKENMAPBOX } from 'src/app/config/variable.config';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit, AfterViewInit {
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  constructor() {
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: ACCESSTOKENMAPBOX,
      // longitud / latitud
      center: [-63.1817381, -17.7839228], // starting position
      zoom: 12 // starting zoom
    });
    this.map.on('load', () => {
      this.map.resize();
    });
    this.map.on('move', (e) => {
      console.log(this.map.getCenter());
    });
    /* this.marker = new mapboxgl.Marker({
      draggable: true
    }).setLngLat([-63.1817381, -17.7839228]).addTo(this.map);
    this.marker.on('dragend', this.onDragEnd.bind(this)); */
    this.map.addControl(new mapboxgl.NavigationControl());
  }
  onDragEnd() {
    const coordinates = document.getElementById('coordinates');
    const lngLat = this.marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML =
    'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
  }

}
