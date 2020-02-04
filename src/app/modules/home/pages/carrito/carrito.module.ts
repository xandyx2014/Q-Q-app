import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TipoPagoComponent } from './components/tipo-pago/tipo-pago.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    CarritoPageRoutingModule
  ],
  declarations: [
    CarritoPage,
    TipoPagoComponent
  ],
  entryComponents: [
    TipoPagoComponent
  ]
})
export class CarritoPageModule {}
