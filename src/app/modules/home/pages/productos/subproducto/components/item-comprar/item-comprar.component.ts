import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { InformacionService } from 'src/app/core/services/informacion.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.redux';
import { AgregarCarritoAction } from 'src/app/store/actions/carrito.actions';
import { v1 as uuidv1 } from 'uuid';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
@Component({
  selector: 'app-item-comprar',
  templateUrl: './item-comprar.component.html',
  styleUrls: ['./item-comprar.component.scss'],
})
export class ItemComprarComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private informacionService: InformacionService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private navParams: NavParams
  ) { }
  ngOnInit() {
    this.crearFormulario();
  }
  crearFormulario() {
    this.myForm = this.fb.group({
      cantidadComprar: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100000), Validators.pattern('^[0-9]+$')])
    });
  }
  comprar() {
    // console.log(this.navParams.data);
    // const producto = {...this.navParams.data, uid: uuidv1()};
    this.store.dispatch(AgregarCarritoAction(({
      ...this.navParams.data,
      uid: uuidv1(),
      cantidad: this.myForm.value.cantidadComprar
    } as Producto)));
    this.informacionService.presentToast('Agregado a tu carrito');
    this.modalCtrl.dismiss();
    this.router.navigate(['/home/productos']);
  }
  cancelar() {
    this.modalCtrl.dismiss();
  }
}
