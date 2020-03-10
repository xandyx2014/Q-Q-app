import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenServiceService } from 'src/app/core/services/orden-service.service';
import { LoginService } from 'src/app/core/auth/login.service';
import { from } from 'rxjs';
import { map, switchMap, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  items = new Array('', '', '', '');
  estado = false;
  ok = true;
  ordenes = [];
  constructor(
    private router: Router,
    private  ordenServiceService: OrdenServiceService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }
  verDetalle(item) {
    this.router.navigate(['/home/detalle-pedido', item.id]);
  }
  buscar() {
    this.ok = false;
    from(this.loginService.userAuth()).pipe(
      map( resp => resp[0]),
      switchMap( resp => this.ordenServiceService.obtenerOrdenes(resp.id,  this.estado === true ? '1' : '0')),
      pluck('data')
    ).subscribe( (resp: any[]) => {
      this.ordenes = resp;
      this.ok = true;
      console.log(resp);
    });
  }
}
