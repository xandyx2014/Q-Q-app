import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePedidoPageRoutingModule } from './detalle-pedido-routing.module';

import { DetallePedidoPage } from './detalle-pedido.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    DetallePedidoPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [DetallePedidoPage]
})
export class DetallePedidoPageModule {}
