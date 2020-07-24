import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_AUTH_ID, URL_WEB, ID_USER } from 'src/app/config/variable.config';

@Injectable({
  providedIn: 'root'
})
export class RefrescarIdOneSignalService {

  constructor(
    private http: HttpClient
  ) { }

  start() {
    const idOneSignal = localStorage.getItem(USER_AUTH_ID);
    const userId = localStorage.getItem(ID_USER);
    console.log(idOneSignal, 'ONE SIGNAL ID ');
    // tslint:disable-next-line: no-string-literal
    this.http.put(`${URL_WEB}/user_app_customer/${userId}?tokenPush=${idOneSignal}`, {}).subscribe(oneSignalResp => {
      console.log(oneSignalResp);
    });
  }
}
