import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {
  rows = [
    { name: 'Austin', gender: 'Male' },
    { name: 'Dany', gender: 'Male' },
    { name: 'Molly', gender: 'Female' },
    { name: 'Austin', gender: 'Male' },
    { name: 'Dany', gender: 'Male'},
    { name: 'Molly', gender: 'Female'},
    { name: 'Austin', gender: 'Male'},
    { name: 'Dany', gender: 'Male'},
    { name: 'Molly', gender: 'Female' },
    { name: 'Austin', gender: 'Male'},
    { name: 'Dany', gender: 'Male'},
    { name: 'Molly', gender: 'Female'},
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
