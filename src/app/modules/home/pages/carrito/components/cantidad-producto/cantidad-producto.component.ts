import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { InformacionService } from 'src/app/core/services/informacion.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.redux';
import { AgregarCarritoAction, ActualizarCantidadCarrito } from 'src/app/store/actions/carrito.actions';

@Component({
  selector: 'app-cantidad-producto',
  templateUrl: './cantidad-producto.component.html',
  styleUrls: ['./cantidad-producto.component.scss'],
})
export class CantidadProductoComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private informacionService: InformacionService,
    private router: Router,
    private store: Store<AppState>,
    private navParams: NavParams,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.navParams.data);
    this.crearFormulario();
  }
  crearFormulario() {
    this.myForm = this.fb.group({
      cantidadComprar: new FormControl(
        this.navParams.get('cantidad'),
        [Validators.required,
        Validators.min(1),
        Validators.max(10000),
        Validators.pattern('^[0-9]+$')])
    });
  }
  comprar() {
    // const producto = {...this.navParams.data, uid: uuidv1()};
    this.store.dispatch(ActualizarCantidadCarrito(
      {
        uid: this.navParams.get('uid'),
        cantidad: this.myForm.value.cantidadComprar
      }
    ));
    this.informacionService.presentToast('Dato Modificado');
    this.modalCtrl.dismiss();
  }
  cancelar() {
    this.modalCtrl.dismiss();
  }
}
