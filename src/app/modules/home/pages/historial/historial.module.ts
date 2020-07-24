import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPageRoutingModule } from './historial-routing.module';

import { HistorialPage } from './historial.page';
import { ResultadoComponent } from './page/resultado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HistorialPageRoutingModule
  ],
  declarations: [HistorialPage, ResultadoComponent],
  entryComponents: [ ResultadoComponent ]
})
export class HistorialPageModule {}
