import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/auth/login.service';

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
    private loginService: LoginService
  ) { }
  crearFormulario() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  save() {
    this.loginService.getToken({
      user: this.myForm.get('username').value,
      password: this.myForm.get('password').value
    });
  }
  ionViewWillEnter() {
    this.loginService.logout();
    this.menuCtrl.enable(false).then(() => {
      this.crearFormulario();
      this.ok = true;
    });
  }
}
