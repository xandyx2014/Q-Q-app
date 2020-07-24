import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class IsOnlineService {

  constructor(private net: Network) { }
  isConnected(): boolean {
    // console.log(this.net.Connection);
    const conntype = this.net.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
  }
}
