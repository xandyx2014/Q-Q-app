import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenServiceService } from 'src/app/core/services/orden-service.service';
import { LoginService } from 'src/app/core/auth/login.service';
import { from } from 'rxjs';
import { map, switchMap, pluck, tap } from 'rxjs/operators';
import { format, subDays, addDays, subHours, addHours } from 'date-fns';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { InformacionService } from 'src/app/core/services/informacion.service';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  estado = false;
  ok = true;
  ordenes = [];
  fechaInicial = format(subDays(new Date(), 7), 'yyyy-MM-dd');
  fechaFinal = format(Date.now(), 'yyyy-MM-dd');
  precioInicial = 1;
  precioFinal = 10000;
  myForm: FormGroup;
  constructor(
    private router: Router,
    private ordenServiceService: OrdenServiceService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private informacionService: InformacionService
  ) { }

  ngOnInit() {
    this.crearFormulario();
  }
  ionViewWillEnter() {
  }
  crearFormulario() {
    this.myForm = this.fb.group({
      state_order: new FormControl(true, [Validators.required]),
      minDate: new FormControl(this.fechaInicial, [Validators.required]),
      maxDate: new FormControl(this.fechaFinal, [Validators.required]),
      minMount: new FormControl(this.precioInicial, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]),
      maxMount: new FormControl(this.precioFinal, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(100000000)]),
    });
  }
  verDetalle(item) {
    this.router.navigate(['/home/detalle-pedido', item.id]);
  }
  buscar() {
    const orderState = this.myForm.value.state_order === true ? '1' : '0';
    const min = subHours(new Date(this.myForm.value.minDate), 1);
    const max = addHours(new Date(this.myForm.value.maxDate), 26);
    // console.log(, format(max, 'yyyy-MM-dd'));
    const minDate = format(min, 'yyyy-MM-dd');
    const maxDate = format(max, 'yyyy-MM-dd');
    const busqueda = {
      ...this.myForm.value,
      state_order: orderState,
      minDate,
      maxDate
    };
    console.log(busqueda);
    this.ok = false;
    from(this.loginService.userAuth()).pipe(
      map(resp => resp[0]),
      switchMap(resp => this.ordenServiceService.obtenerOrdenes(resp.id, busqueda)),
      tap(resp => {
        console.log(resp);
      }),
      pluck('data'),
      tap((resp: any[]) => {
        if (resp.length === 0) {
          this.informacionService.presentToast('No se ha encontrado productos');
        }
      })
    ).subscribe((resp: any[]) => {
      this.ordenes = resp;
      this.ok = true;
      console.log(resp);
    });
  }
}
