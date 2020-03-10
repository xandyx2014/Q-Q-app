import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TipoPagoComponent } from './components/tipo-pago/tipo-pago.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CantidadProductoComponent } from './components/cantidad-producto/cantidad-producto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FlexLayoutModule,
    CarritoPageRoutingModule,
    PipesModule
  ],
  declarations: [
    CarritoPage,
    TipoPagoComponent,
    CantidadProductoComponent
  ],
  entryComponents: [
    TipoPagoComponent,
    CantidadProductoComponent
  ]
})
export class CarritoPageModule {}
