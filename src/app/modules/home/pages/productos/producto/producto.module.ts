import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';
import { ItemComprarComponent } from './components/item-comprar/item-comprar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    ProductoPageRoutingModule
  ],
  declarations: [
    ProductoPage,
    ItemComprarComponent],
  entryComponents: [
    ItemComprarComponent
  ]
})
export class ProductoPageModule {}
