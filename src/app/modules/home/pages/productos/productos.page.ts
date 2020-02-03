import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  producto = [{}, {}, {}, {}, {}, {}, {}, {}];
  constructor() { }

  ngOnInit() {
  }

}
