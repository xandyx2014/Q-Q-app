import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubproductoPageRoutingModule } from './subproducto-routing.module';

import { SubproductoPage } from './subproducto.page';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    SubproductoPageRoutingModule
  ],
  declarations: [SubproductoPage],
})
export class SubproductoPageModule {}
