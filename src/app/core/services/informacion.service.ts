import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(
    private toastController: ToastController
  ) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2500
    });
    toast.present();
  }
}
