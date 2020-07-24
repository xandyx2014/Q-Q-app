import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleProductoServiceService } from 'src/app/core/services/detalle-producto-service.service';
import { DetalleProducto } from 'src/app/shared/interfaces/detailsProducto.interface';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RespuestaPedidoService } from 'src/app/core/services/respuesta-pedido.service';
import { InformacionService } from 'src/app/core/services/informacion.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-name',
    templateUrl: './resultado.component.html',
})
export class ResultadoComponent implements OnInit {
    @Input() pedidoId: string;
    detalleProducto: DetalleProducto[];
    detalleProductoId: string[] = [];
    desabilitarCheckBox = true;
    myForm: FormGroup;
    constructor(
        private modalCtrl: ModalController,
        private detalleProductoServiceService: DetalleProductoServiceService,
        private fb: FormBuilder,
        private respuestaPedidoService: RespuestaPedidoService,
        private informaconService: InformacionService
    ) { }

    ngOnInit(): void { }
    ionViewWillEnter() {
        this.crearFormulario();
        this.obtenerDetallePedido(this.pedidoId);
    }
    irAtras() {
        this.modalCtrl.dismiss();
    }
    crearFormulario() {
        this.myForm = this.fb.group({
            estado: new FormControl('1', [Validators.required]),
            observacion: new FormControl('', [Validators.required]),
        });
        this.myForm.get('estado').valueChanges.subscribe(resp => {
            if (resp === '1') {
                 this.desabilitarCheckBox = true;
            }
            if (resp === '3') {
                 this.desabilitarCheckBox = false;
            }
            if (resp === '6') {
                 this.desabilitarCheckBox = false;
            }
        });
    }
    agregarControl(detalleProducto: DetalleProducto[]) {
        detalleProducto.forEach( detalle => {
            this.detalleProductoId.push(detalle.id);
            this.myForm.addControl( detalle.id , this.fb.control(false));
        });
    }
    parsearDetalleProducto() {
        const detalleArray = [];
        this.detalleProductoId.forEach( detalle => {
            // tslint:disable-next-line: no-unused-expression
            Object.keys(this.myForm.controls).forEach(resp => {
                if (detalle === resp) {
                    if (this.myForm.value[resp]) {
                        const valor = this.myForm.value[resp] === true ? '3' : '6';
                        const detalleObject =  {
                            order_id: this.pedidoId,
                            detail_order_id: resp,
                            state: valor
                        };
                        detalleArray.push(detalleObject);
                    }
                }
            });
            // console.log(this.myForm.controls);
        });
        return detalleArray;
    }
    enviar() {
        let detalleProducto = this.parsearDetalleProducto();
        const estado = Number(this.myForm.value.estado);
        if (estado === 1) {
            detalleProducto = [];
        }
        const dato = {
            pedido_id: this.pedidoId,
            estado,
            observacion: this.myForm.value.observacion,
            detalle_producto: detalleProducto
        };
        this.respuestaPedidoService.enviar(dato).pipe(
            take(1)
        ).subscribe( async  (resp: any) => {
            console.log(resp);
            await this.modalCtrl.dismiss({
                ok: true
            });
            await this.informaconService.presentAlert({
                header: 'Respuesta enviada',
                message: resp.status,
                subHeader: 'estado del envio'
            });
        });
        console.log(dato);
    }
    obtenerDetallePedido(id) {
        this.detalleProductoServiceService.obtenerDetalleProducto(id).subscribe(resp => {
          console.log(resp);
          this.detalleProducto = resp;
          this.agregarControl(this.detalleProducto);
        });
    }
}
