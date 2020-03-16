import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';
import { ItemComprarComponent } from './components/item-comprar/item-comprar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FlexLayoutModule,
    PipesModule,
    ProductoPageRoutingModule,
  ],
  declarations: [
    ProductoPage,
    ItemComprarComponent],
  entryComponents: [
    ItemComprarComponent
  ]
})
export class ProductoPageModule {}
