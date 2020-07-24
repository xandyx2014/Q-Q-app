import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map, switchMap, tap, pluck } from 'rxjs/operators';
import { OrdenServiceService } from 'src/app/core/services/orden-service.service';
import { LoginService } from 'src/app/core/auth/login.service';
import { InformacionService } from 'src/app/core/services/informacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pendientes = 0;
  entregados = 0;
  constructor(
    private ordenServiceService: OrdenServiceService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.obtenerProducto();
  }
  obtenerProducto() {
    from(this.loginService.userAuth()).pipe(
      map( resp => resp[0]),
      switchMap( resp => this.ordenServiceService.obtenerOrdenes(resp.id)),
    ).subscribe( ( resp: any) => {
      this.pendientes = resp.pendientes;
      this.entregados = resp.entregados;
      // console.log(resp);
    });
  }

}
