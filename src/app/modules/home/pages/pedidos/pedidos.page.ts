import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  items = new Array('', '', '', '');
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  verDetalle() {
    this.router.navigate(['/home/detalle-pedido']);
  }
}
