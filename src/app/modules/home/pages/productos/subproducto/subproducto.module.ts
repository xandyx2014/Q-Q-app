import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubproductoPageRoutingModule } from './subproducto-routing.module';

import { SubproductoPage } from './subproducto.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ItemComprarComponent } from './components/item-comprar/item-comprar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    SubproductoPageRoutingModule
  ],
  declarations: [SubproductoPage, ItemComprarComponent],
  entryComponents: [
    ItemComprarComponent
  ]
})
export class SubproductoPageModule {}
