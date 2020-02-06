import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2500
    });
    toast.present();
  }
  async presentAlert({ header, subHeader, message}: { header: string, subHeader: string, message: string}) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
