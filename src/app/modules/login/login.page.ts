import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/auth/login.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.redux';
import { vaciarProductoAction } from 'src/app/store/actions/productos.action';
import { vaciarSubProductoAction } from 'src/app/store/actions/subProducto.actions';
import { EliminarTodosCarritoAction } from 'src/app/store/actions/carrito.actions';
import { IsOnlineService } from 'src/app/core/services/is-online.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm: FormGroup;
  ok = false;
  constructor(
    private menuCtrl: MenuController,
    private fb: FormBuilder,
    private loginService: LoginService,
    private store: Store<AppState>,
    private isOnlineService: IsOnlineService
  ) { }
  crearFormulario() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    const resp = this.isOnlineService.isConnected();
    console.log(resp);
  }
  save() {
    this.loginService.getToken({
      user: this.myForm.get('username').value,
      password: this.myForm.get('password').value
    });
  }
  ionViewWillEnter() {
    console.log(this.isOnlineService.isConnected());
    this.loginService.logout();
    this.menuCtrl.enable(false).then(() => {
      this.crearFormulario();
      this.ok = true;
    });
    this.store.dispatch(vaciarProductoAction());
    this.store.dispatch(vaciarSubProductoAction());
    this.store.dispatch(EliminarTodosCarritoAction());
  }
}
