import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { USER_AUTH_ID } from 'src/app/config/variable.config';
@Injectable({
  providedIn: 'root'
})
export class PushService {
  userId: string;
  constructor(
    private oneSignal: OneSignal
  ) { }
  configuracionInicial() {
    this.oneSignal.startInit('843bccee-e8eb-4097-8376-6e6b543475b7', '537053162638');
    // alerta desde arriba
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe(( notificacion) => {
      // do something when notification is received
      // notificacion.payload.additionalData
      console.log('NOTIFICACION RECIBIDA');
    });
    // no working
    this.oneSignal.handleNotificationOpened().subscribe((notificacion) => {
      // do something when a notification is opened
      // notification.payload.additionalData
      console.log('NOTIFICACION ABIERTA');
    });
    // obtenerId del subscriptor
    this.oneSignal.getIds().then( info => {
      this.userId = info.userId;
      localStorage.setItem(USER_AUTH_ID, this.userId);
      console.log('USER ID', this.userId);
    });
    this.oneSignal.endInit();
  }
  private obtenerPayload(data: OSNotification) {
    const payload = data.payload;
    return payload;
  }
}
