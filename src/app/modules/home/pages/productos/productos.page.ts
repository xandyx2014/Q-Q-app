import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  producto = [{}, {}, {}, {}, {}, {}, {}, {}];
  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }
  irProducto(id = 1) {
    this.route.navigate([`/home/productos`, id]);
  }
  irSubProducto() {
    this.route.navigate(['/home/subproductos']);
  }
}
