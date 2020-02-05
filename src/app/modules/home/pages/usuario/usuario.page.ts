import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionService } from 'src/app/core/services/informacion.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  constructor(
    private router: Router,
    private informacionService: InformacionService,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
   /*  this.storage.set('name', 'Max').then( () => {
      this.storage.remove('name');
    }); */
    console.log(navigator.onLine);
  }
  guardarInformacionUsuario() {
    this.informacionService.presentToast('Informacion se Guardo correctamente');
    // this.router.navigate(['/home']);
  }
}
